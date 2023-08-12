import { EventRepository } from '../repositories/EventRepository'
import { Event } from '../entities/Event'
import { HttpException } from '../interfaces/httpException'
import axios from 'axios'
import { AddressGoogleType } from '../interfaces/AddressGoogleType'

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

    eventData = {
      ...eventData,
      city: nameCity,
    }

    const result = await this.eventRepository.add(eventData)
    return result
  }

  async findEventByLocation(latitude: string, longitude: string) {
    const cityName = await this.getCityNameByCoordinates(latitude, longitude)
    const findEventsByCity = await this.eventRepository.findEventsByCity(
      cityName,
    )

    const eventWithRadius = findEventsByCity.filter((event: Event) => {
      const distance = this.calculateDistance(
        Number(latitude),
        Number(longitude),
        Number(event.location.latitude),
        Number(event.location.longitude),
      )

      return distance <= 3
    })
    return eventWithRadius
  }

  async findEventsByCategory(category: string) {
    if (!category) throw new HttpException(400, 'Caterogy is required')
    const events = await this.eventRepository.getEventsByCategory(category)
    return events
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

        return city
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
