import { NextFunction, Request, Response } from 'express'
import { HttpException } from '../interfaces/httpException'

export function ErrorMiddleware(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const status: number = err.status ?? 500
  const message: string = err.message ?? 'Internal server error.'

  res.status(status).json({
    message,
    status,
  })
}
