import express, { Application } from 'express'
import { connect } from './infra/database'
import { ErrorMiddleware } from './middlewares/error.middleware'
import { EventRoutes } from './routes/EventRoutes'

class App {
  public app: Application
  private eventRoutes = new EventRoutes()

  constructor() {
    this.app = express()
    this.middlewaresInicialize()
    this.inicializeRoutes()
    this.interceptionError()
    connect()
  }

  private interceptionError() {
    this.app.use(ErrorMiddleware)
  }

  private inicializeRoutes() {
    this.app.use('/events', this.eventRoutes.router)
  }

  private middlewaresInicialize() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  listen() {
    this.app.listen(3333, () => console.log('Server is running!'))
  }
}

export { App }
