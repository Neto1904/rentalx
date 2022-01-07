import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { Rental } from '@modules/rentals/infrra/typeorm/entity/Rental'

import { IRentalsRepository } from '../IRentalsRepository'

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = []

  async findActiveCar(carId: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.carId === carId && !rental.endDate
    )
  }

  async findActiveUser(userId: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.userId === userId && !rental.endDate
    )
  }

  async create({
    userId,
    carId,
    expectedReturnDate,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental()

    Object.assign(rental, {
      carId,
      userId,
      expectedReturnDate,
      startDate: new Date(),
    })

    this.rentals.push(rental)

    return rental
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.rentals.find((rental) => rental.id === id)
    return rental
  }

  async findByUserId(userId: string): Promise<Rental[]> {
    return this.rentals.filter((rental) => rental.userId === userId)
  }
}

export { RentalsRepositoryInMemory }
