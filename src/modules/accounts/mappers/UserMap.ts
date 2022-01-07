import { instanceToInstance } from 'class-transformer'

import { IUserResponseDTO } from '../dtos/IUserResponseDTO'
import { User } from '../infra/typeorm/entities/User'

export class UserMap {
  static toDTO({
    name,
    email,
    id,
    driverLicense,
    avatar,
    avatarUrl,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      name,
      email,
      id,
      driverLicense,
      avatar,
      avatarUrl,
    })
    return user
  }
}
