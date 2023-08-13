import { Event } from '../entities/Event'
import { Location } from '../entities/Location'
import { User } from '../entities/User'

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
}

export { EventRepository }
