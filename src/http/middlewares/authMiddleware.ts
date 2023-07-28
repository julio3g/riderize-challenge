/* eslint-disable @typescript-eslint/no-namespace */
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { auth } from '../../env/auth'

interface TokenPayload {
  userId: string
  iat: number
  exp: number
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload
    }
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    req.user = undefined
    next()
    return
  }

  const [, token] = authHeader.split(' ')

  if (token) {
    try {
      const payload = verify(token, auth.secretJwt) as TokenPayload
      req.user = payload
    } catch (err) {
      console.log('Token verification error:', err)
    }
  }

  next()
}
