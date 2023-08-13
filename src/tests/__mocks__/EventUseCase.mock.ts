import { EventUseCase } from '../../useCases/EventUseCase'

const eventRepository = {
  add: jest.fn(),
  getEventsByCategory: jest.fn(),
  getEventsByName: jest.fn(),
  getEventById: jest.fn(),
  findByLocationAndDate: jest.fn(),
  findEventsByCity: jest.fn(),
  update: jest.fn(),
}
const eventUseCaseMock = new EventUseCase(eventRepository)

export { eventUseCaseMock, eventRepository }
