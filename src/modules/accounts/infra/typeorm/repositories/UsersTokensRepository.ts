import { getRepository, Repository } from 'typeorm'

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'

import { UserTokens } from '../entities/UserTokens'

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>

  constructor() {
    this.repository = getRepository(UserTokens)
  }

  async create({
    userId,
    expiresDate,
    refreshToken,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      userId,
      expiresDate,
      refreshToken,
    })

    await this.repository.save(userToken)

    return userToken
  }

  async findUserToken(
    userId: string,
    refreshToken: string
  ): Promise<UserTokens> {
    const token = await this.repository.findOne({
      where: { refreshToken, userId },
    })
    return token
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete({ id })
  }

  async findByToken(token: string): Promise<UserTokens> {
    return await this.repository.findOne({ refreshToken: token })
  }
}

export { UsersTokensRepository }
