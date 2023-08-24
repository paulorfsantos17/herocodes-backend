import { Event } from '../entities/Event'
import { Location } from '../entities/Location'
import { IFilterProps } from '../interfaces/IFilterProps'

interface EventRepository {
  add(event: Event): Promise<Event>

  findByLocationAndDate(
    location: Location,
    date: Date,
  ): Promise<Event | undefined>

  findEventsByCity(city: string): Promise<Event[]>

  getEventsByCategory(category: string): Promise<Event[]>

  getEventsByName(name: string): Promise<Event[]>
  getEventById(id: string): Promise<Event | undefined>

  update(event: Event, id: string): Promise<any>
  getEventsMain(date: Date): Promise<Event[]>
  findEventByFilter({
    category,
    date,
    latitude,
    longitude,
    name,
    price,
    radius,
  }: IFilterProps): Promise<Event[]>
}

export { EventRepository }
