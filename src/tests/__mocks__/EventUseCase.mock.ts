import { EventRepository } from '../../repositories/EventRepository'
import { EventUseCase } from '../../useCases/EventUseCase'

const eventRepository: EventRepository = {
  add: jest.fn(),
  getEventsByCategory: jest.fn(),
  getEventsByName: jest.fn(),
  getEventById: jest.fn(),
  findByLocationAndDate: jest.fn(),
  findEventsByCity: jest.fn(),
  update: jest.fn(),
  getEventsMain: jest.fn(),
  findEventByFilter: jest.fn(),
}
const eventUseCaseMock = new EventUseCase(eventRepository)

export { eventUseCaseMock, eventRepository }
