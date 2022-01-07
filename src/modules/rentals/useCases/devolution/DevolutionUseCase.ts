import { inject, injectable } from 'tsyringe'

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { Rental } from '@modules/rentals/infrra/typeorm/entity/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  rentalId: string
  userId: string
}

@injectable()
class DevolutionUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ rentalId, userId }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(rentalId)
    const car = await this.carsRepository.findById(rental.carId)

    if (!rental) {
      throw new AppError('Rental does not exist')
    }

    const now = new Date()
    const delay = await this.dateProvider.compareInDays(
      rental.expectedReturnDate,
      now
    )

    let daysRented = await this.dateProvider.compareInDays(
      rental.startDate,
      now
    )

    const minimumRentDays = 1

    if (daysRented < minimumRentDays) {
      daysRented = minimumRentDays
    }

    let total = 0

    if (delay > 0) {
      total += delay * car.fineAmount
    }

    total += daysRented * car.dailyRate

    rental.endDate = new Date()
    rental.total = total
    console.log(rental)
    await this.rentalsRepository.create(rental)

    await this.carsRepository.updateAvailable(car.id, true)

    return rental
  }
}

export { DevolutionUseCase }
