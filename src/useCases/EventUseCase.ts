import { EventRepository } from '../repositories/EventRepository'
import { Event } from '../entities/Event'

class EventUseCase {
  private eventRepository: EventRepository
  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository
  }

  async create(eventData: Event) {
    const result = await this.eventRepository.add(eventData)
    return result
  }
}

export { EventUseCase }
