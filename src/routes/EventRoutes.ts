import { Router } from 'express'
import { EventRepositoryMongose } from '../repositories/EventRepositoryMongoose'
import { EventController } from '../controllers/EventConstrollers'
import { EventUseCase } from '../useCases/EventUseCase'

class EventRoutes {
  public router: Router
  private eventController: EventController

  constructor() {
    this.router = Router()
    const eventRespository = new EventRepositoryMongose()
    const eventUseCase = new EventUseCase(eventRespository)
    this.eventController = new EventController(eventUseCase)
    this.initRoutes()
  }

  initRoutes() {
    this.router.post(
      '/',
      this.eventController.create.bind(this.eventController),
    )
  }
}

export { EventRoutes }
