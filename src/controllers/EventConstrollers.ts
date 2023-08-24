import { NextFunction, Request, Response } from 'express'
import { EventUseCase } from '../useCases/EventUseCase'
import { FilesMulter } from '../interfaces/FilesMulter'
import { Event } from '../entities/Event'

class EventController {
  private eventUsecase: EventUseCase
  constructor(eventUsecase: EventUseCase) {
    this.eventUsecase = eventUsecase
  }

  async create(req: Request, res: Response, next: NextFunction) {
    let eventData: Event = req.body
    const categoriesBody = eventData.categories
    const categories = String(categoriesBody).split(',')

    if (req.files) {
      const files = req.files as any
      const banner: FilesMulter = files.banner[0]
      const flyers: FilesMulter[] = files.flyers
      const map: FilesMulter = files.map[0]

      eventData = {
        ...eventData,
        banner: banner.filename,
        flyers: flyers.map((flyer: FilesMulter) => flyer.filename),
        map: map.filename,
        categories,
      }
    }

    try {
      await this.eventUsecase.create(eventData)
      return res.status(201).send({ message: 'Evento criado com Sucesso' })
    } catch (error) {
      next(error)
    }
  }

  async findEventBylocation(req: Request, res: Response, next: NextFunction) {
    const { latitude, longitude } = req.query
    try {
      const events = await this.eventUsecase.findEventByLocation(
        String(latitude),
        String(longitude),
      )
      return res.status(200).json(events)
    } catch (error) {
      next(error)
    }
  }

  async findEventById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    try {
      const event = await this.eventUsecase.findEventById(String(id))

      return res.status(200).json(event)
    } catch (error) {
      next(error)
    }
  }

  async addParticipant(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    const { name, email } = req.body

    try {
      const event = await this.eventUsecase.addParticipant(id, name, email)

      return res.status(200).json(event)
    } catch (error) {
      next(error)
    }
  }

  async findEventsByName(req: Request, res: Response, next: NextFunction) {
    const { name } = req.query

    try {
      const events = await this.eventUsecase.findEventsByName(String(name))

      return res.status(200).json(events)
    } catch (error) {
      next(error)
    }
  }

  async findMainEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await this.eventUsecase.findEventsMain()

      return res.status(200).json(events)
    } catch (error) {
      next(error)
    }
  }

  async findEventsByCategory(req: Request, res: Response, next: NextFunction) {
    const { category } = req.params

    try {
      const events = await this.eventUsecase.findEventsByCategory(
        String(category),
      )

      return res.status(200).json(events)
    } catch (error) {
      next(error)
    }
  }

  async filterEvents(req: Request, res: Response, next: NextFunction) {
    const { category, latitude, longitude, name, date, price, radius } =
      req.query

    try {
      const events = await this.eventUsecase.filterEvents({
        category: String(category),
        latitude: Number(latitude),
        longitude: Number(longitude),
        name: String(name),
        date: String(date),
        price: String(price),
        radius: String(radius),
      })

      return res.status(200).json(events)
    } catch (error) {
      next(error)
    }
  }
}

export { EventController }
