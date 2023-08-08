import { NextFunction, Request, Response } from 'express'
import { EventUseCase } from '../useCases/EventUseCase'

class EventController {
  private eventUsecase: EventUseCase
  constructor(eventUsecase: EventUseCase) {
    this.eventUsecase = eventUsecase
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const eventData = req.body
    try {
      await this.eventUsecase.create(eventData)
      return res.status(201).send('Evento criado com Sucesso')
    } catch (error) {
      next(error)
    }
  }
}

export { EventController }
