import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import authConfig from '@config/auth'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
  refreshToken: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new AppError('Email or password incorrect')
    }
    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      throw new AppError('Email or password incorrect')
    }
    const token = sign({}, authConfig.secretToken, {
      subject: user.id,
      expiresIn: authConfig.expiresIn,
    })

    const refreshToken = sign(
      { email: user.email },
      authConfig.secretRefreshToken,
      {
        subject: user.id,
        expiresIn: authConfig.expiresInRefreshToken,
      }
    )

    const expiresDate = await this.dateProvider.addDays(
      authConfig.refreshTokenExpirationDays
    )

    await this.usersTokensRepository.create({
      userId: user.id,
      refreshToken,
      expiresDate,
    })

    return { user: { name: user.name, email: user.email }, token, refreshToken }
  }
}

export { AuthenticateUserUseCase }
