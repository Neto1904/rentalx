import { injectable, inject } from 'tsyringe'

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { Rental } from '@modules/rentals/infrra/typeorm/entity/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  userId: string
  carId: string
  expectedReturnDate: Date
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    userId,
    carId,
    expectedReturnDate,
  }: IRequest): Promise<Rental> {
    const rentalCar = await this.rentalsRepository.findActiveCar(carId)
    if (rentalCar && !rentalCar.endDate) {
      throw new AppError('Car Unavailable')
    }

    const rentalUser = await this.rentalsRepository.findActiveUser(userId)

    if (rentalUser && !rentalUser.endDate) {
      throw new AppError('User already have active rental')
    }

    const compare = await this.dateProvider.compare(
      new Date(),
      expectedReturnDate
    )

    if (compare < 24) {
      throw new AppError('Rental must be at least for 24 hours')
    }
    const rental = await this.rentalsRepository.create({
      userId,
      carId,
      expectedReturnDate,
    })

    await this.carsRepository.updateAvailable(carId, false)

    return rental
  }
}

export { CreateRentalUseCase }
