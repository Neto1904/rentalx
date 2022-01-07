import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ token, password }: IRequest) {
    const userToken = await this.usersTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('Invalid Token')
    }

    const now = new Date()
    const isValidToken = await this.dateProvider.isBefore(
      now,
      userToken.expiresDate
    )

    if (!isValidToken) {
      throw new AppError('Expired Token')
    }

    const user = await this.usersRepository.findById(userToken.userId)

    user.password = await hash(password, 8)

    await this.usersRepository.create(user)

    await this.usersTokensRepository.deleteById(userToken.id)
  }
}

export { ResetPasswordUseCase }
