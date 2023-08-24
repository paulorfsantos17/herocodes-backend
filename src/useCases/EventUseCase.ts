import { EventRepository } from '../repositories/EventRepository'
import { Event } from '../entities/Event'
import { HttpException } from '../interfaces/httpException'
import axios from 'axios'
import { AddressGoogleType } from '../interfaces/AddressGoogleType'
import { UserRepositoryMongoose } from '../repositories/UserRepositoryMongoose'
import { IFilterProps } from '../interfaces/IFilterProps'

class EventUseCase {
  private eventRepository: EventRepository
  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository
  }

  async create(eventData: Event) {
    if (!eventData.banner) throw new HttpException(400, 'Banner is required')
    if (!eventData.flyers) throw new HttpException(400, 'Flyers is required')
    if (!eventData.location)
      throw new HttpException(400, 'Location is required')

    const verifyEvent = await this.eventRepository.findByLocationAndDate(
      eventData.location,
      eventData.date,
    )

    if (verifyEvent) throw new HttpException(400, 'Event already existed.')

    const nameCity = await this.getCityNameByCoordinates(
      eventData.location.latitude,
      eventData.location.longitude,
    )

    const eventDateUpdate = {
      ...eventData,
      city: nameCity.city,
      formattedAddress: nameCity.formattedAddress,
    }

    const result = await this.eventRepository.add(eventDateUpdate)
    return result
  }

  async findEventByLocation(latitude: string, longitude: string) {
    const cityName = await this.getCityNameByCoordinates(latitude, longitude)
    try {
      const findEventsByCity = await this.eventRepository.findEventsByCity(
        cityName.city,
      )

      const eventWithRadius = findEventsByCity.filter((event) => {
        const distance = this.calculateDistance(
          Number(latitude),
          Number(longitude),
          Number(event.location.latitude),
          Number(event.location.longitude),
        )

        return distance <= 100
      })
      return eventWithRadius
    } catch (error) {
      console.log(error)
    }
  }

  async findEventsByCategory(category: string) {
    if (!category) throw new HttpException(400, 'Caterogy is required')
    const events = await this.eventRepository.getEventsByCategory(category)
    return events
  }

  async filterEvents({
    category,
    latitude,
    longitude,
    name,
    date,
    price,
    radius,
  }: IFilterProps) {
    const events = await this.eventRepository.findEventByFilter({
      category,
      latitude,
      longitude,
      name,
      date,
      price,
      radius,
    })
    return events
  }

  async findEventsMain() {
    const events = await this.eventRepository.getEventsMain(new Date())
    return events
  }

  async findEventsByName(name: string) {
    if (!name) throw new HttpException(400, 'Name is required')
    const events = await this.eventRepository.getEventsByName(String(name))
    return events
  }

  async findEventById(id: string) {
    if (!id) throw new HttpException(400, 'Id is required')
    const events = await this.eventRepository.getEventById(String(id))
    return events
  }

  async addParticipant(id: string, name: string, email: string) {
    const event = await this.eventRepository.getEventById(id)
    if (!event) throw new HttpException(400, 'Event not found.')

    const userRepostiorio = new UserRepositoryMongoose()
    const participant = {
      name,
      email,
    }

    let user: any = {}

    const verifyIsUserExists = await userRepostiorio.verifyIsUserExits(email)

    if (!verifyIsUserExists) {
      user = await userRepostiorio.add(participant)
      user = await userRepostiorio.verifyIsUserExits(email)
      console.log(user)
    } else {
      user = verifyIsUserExists
    }

    if (event.participants.includes(user._id))
      throw new HttpException(400, 'User Already exists')

    event.participants.push(user._id)

    await this.eventRepository.update(event, id)

    return event
  }

  private async getCityNameByCoordinates(latitude: string, longitude: string) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAs4e9zh6WG1MdYplCpvFLyidwhBae1oBE`,
      )

      if (response.data.status === 'OK' && response.data.results.length > 0) {
        const address = response.data.results[0].address_components
        const cityType = address.find(
          (type: AddressGoogleType) =>
            type.types.includes('administrative_area_level_2') &&
            type.types.includes('political'),
        )

        const city = cityType.long_name
        const formattedAddress = response.data.results[0].formatted_address

        return {
          city,
          formattedAddress,
        }
      }

      throw new HttpException(400, 'Not found City')
    } catch (error) {
      throw new HttpException(401, 'Error requesta city name.')
    }
  }

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371 // Raio da Terra em quilômetros
    const dLat = this.deg2rad(lat2 - lat1)
    const dLon = this.deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c
    return d
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180)
  }
}

export { EventUseCase }
