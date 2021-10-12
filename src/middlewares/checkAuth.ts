import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import { AppError } from '../errors/AppError'
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository'

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
    const { sub: id } = verify(
      token,
      '56e3c0f4e3224b87f78ad23edbd13736'
    ) as IPayload
    const usersRepository = new UsersRepository()
    const userExists = await usersRepository.findById(id)
    if (!userExists) {
      throw new AppError('User does not exist', 401)
    }
    request.id = id
    next()
  } catch (error) {
    throw new AppError('Invalid token', 401)
  }
}
