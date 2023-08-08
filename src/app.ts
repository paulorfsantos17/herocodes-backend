import express, { Application } from 'express'
import { connect } from './infra/database'
import { ErrorMiddleware } from './middlewares/error.middleware'

class App {
  public app: Application

  constructor() {
    this.app = express()
    this.middlewaresInicialize()
    this.inicializeRoutes()
    this.interceptionError()
    connect()
  }

  interceptionError() {
    this.app.use(ErrorMiddleware)
  }

  inicializeRoutes() {
    // this.app.use('/')
  }
  
  middlewaresInicialize() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({extended:true}))
  }

  listen() {
    this.app.listen(3333, () => console.log('Server is running!'))
  }
}

export {App}