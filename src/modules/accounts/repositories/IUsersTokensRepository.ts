import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO'
import { UserTokens } from '../infra/typeorm/entities/UserTokens'

interface IUsersTokensRepository {
  create({
    userId,
    expiresDate,
    refreshToken,
  }: ICreateUserTokenDTO): Promise<UserTokens>
  findUserToken(userId: string, refreshToken: string): Promise<UserTokens>
  deleteById(id: string): Promise<void>
  findByToken(token: string): Promise<UserTokens>
}

export { IUsersTokensRepository }
