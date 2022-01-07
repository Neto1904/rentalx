import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO'
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens'

import { IUsersTokensRepository } from '../IUsersTokensRepository'

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private usersTokens: UserTokens[] = []

  async create({
    userId,
    expiresDate,
    refreshToken,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens()

    Object.assign(userToken, {
      expiresDate,
      refreshToken,
      userId,
    })

    this.usersTokens.push(userToken)

    return userToken
  }
  async findUserToken(
    userId: string,
    refreshToken: string
  ): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (userToken) =>
        userToken.userId === userId && userToken.refreshToken === refreshToken
    )

    return userToken
  }
  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find((userToken) => userToken.id === id)
    this.usersTokens.splice(this.usersTokens.indexOf(userToken))
  }
  async findByToken(token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (userToken) => userToken.refreshToken === token
    )

    return userToken
  }
}

export { UsersTokensRepositoryInMemory }
