import { getRepository, Repository } from 'typeorm'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO'
import { User } from '../entities/User'

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = this.repository.create(data)
    await this.repository.save(user)
    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email: email })
    return user
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id })
    return user
  }
}

export { UsersRepository }
