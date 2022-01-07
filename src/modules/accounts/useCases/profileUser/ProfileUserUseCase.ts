import { inject, injectable } from 'tsyringe'

import { IUserResponseDTO } from '@modules/accounts/dtos/IUserResponseDTO'
import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { UserMap } from '@modules/accounts/mappers/UserMap'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IStorageProvider } from '@shared/container/providers/storageProvider/IStorageProvider'

@injectable()
export class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id)
    return UserMap.toDTO(user)
  }
}
