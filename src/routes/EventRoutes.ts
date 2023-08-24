import { Router } from 'express'
import { EventRepositoryMongose } from '../repositories/EventRepositoryMongoose'
import { EventController } from '../controllers/EventConstrollers'
import { EventUseCase } from '../useCases/EventUseCase'
import { upload } from '../infra/multer'

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
      upload.fields([
        {
          name: 'banner',
          maxCount: 1,
        },
        {
          name: 'flyers',
          maxCount: 3,
        },
        {
          name: 'map',
          maxCount: 1,
        },
      ]),
      this.eventController.create.bind(this.eventController),
    )
    this.router.get(
      '/',
      this.eventController.findEventBylocation.bind(this.eventController),
    )
    this.router.get(
      '/category/:category',
      this.eventController.findEventsByCategory.bind(this.eventController),
    )
    this.router.get(
      '/main',
      this.eventController.findMainEvents.bind(this.eventController),
    )
    this.router.get(
      '/name',
      this.eventController.findEventsByName.bind(this.eventController),
    )
    this.router.get(
      '/filter',
      this.eventController.filterEvents.bind(this.eventController),
    )
    this.router.get(
      '/:id',
      this.eventController.findEventById.bind(this.eventController),
    )
    this.router.post(
      '/:id/participants',
      this.eventController.addParticipant.bind(this.eventController),
    )
  }
}

export { EventRoutes }
