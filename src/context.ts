import { Request, Response } from 'express'

interface UserPayload {
  userId: string
  iat: number
  exp: number
}

export interface Context {
  req: Request & { user?: UserPayload }
  res: Response
}
