import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import authConfig from '@config/auth'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'

interface IPayload {
  sub: string
  email: string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(
    refreshToken: string
  ): Promise<{ token: string; refreshToken: string }> {
    const { sub: userId, email } = verify(
      refreshToken,
      authConfig.secretRefreshToken
    ) as IPayload

    const userToken = await this.usersTokensRepository.findUserToken(
      userId,
      refreshToken
    )

    if (!userToken) {
      throw new AppError('Refresh Token doen not exist')
    }

    await this.usersTokensRepository.deleteById(userToken.id)

    const newRefreshToken = sign(
      { email: email },
      authConfig.secretRefreshToken,
      {
        subject: userId,
        expiresIn: authConfig.expiresInRefreshToken,
      }
    )

    const expiresDate = await this.dateProvider.addDays(
      authConfig.refreshTokenExpirationDays
    )

    await this.usersTokensRepository.create({
      userId,
      refreshToken: newRefreshToken,
      expiresDate,
    })

    const token = sign({}, authConfig.secretToken, {
      subject: userId,
      expiresIn: authConfig.expiresIn,
    })

    return { token, refreshToken: newRefreshToken }
  }
}

export { RefreshTokenUseCase }
