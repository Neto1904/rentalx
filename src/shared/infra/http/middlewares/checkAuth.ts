import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '@config/auth'
import { AppError } from '@shared/errors/AppError'

interface IPayload {
  sub: string
}

export async function checkAuth(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const auth = request.headers.authorization

  if (!auth) {
    throw new AppError('Missing token', 401)
  }

  const [, token] = auth.split(' ')

  try {
    const { sub: id } = verify(token, authConfig.secretToken) as IPayload

    request.id = id

    next()
  } catch (error) {
    throw new AppError('Invalid token', 401)
  }
}
