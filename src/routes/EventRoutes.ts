import { Router } from "express";

class EventRoutes {
  public router: Router

  constructor() {
    this.router = Router()
  }

  initRoutes() {
    this.router.post('/')
  }
}

export {EventRoutes}