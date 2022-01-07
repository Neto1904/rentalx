import { getRepository, Repository } from 'typeorm'

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'

import { Rental } from '../entity/Rental'

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async findActiveCar(carId: string): Promise<Rental> {
    return await this.repository.findOne({ carId })
  }
  async findActiveUser(userId: string): Promise<Rental> {
    return await this.repository.findOne({ userId })
  }
  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data)

    await this.repository.save(rental)

    return rental
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ id })
    return rental
  }

  async findByUserId(userId: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { userId: userId },
      relations: ['car'],
    })
    return rentals
  }
}

export { RentalsRepository }
