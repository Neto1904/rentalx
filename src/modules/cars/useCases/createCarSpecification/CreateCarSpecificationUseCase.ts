import { inject, injectable } from 'tsyringe'

import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  carId: string
  specificationId: string[]
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {}
  async execute({ carId, specificationId }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(carId)

    if (!carExists) {
      throw new AppError('Car does not exist')
    }

    const specifications = await this.specificationRepository.findByIds(
      specificationId
    )

    carExists.specifications = specifications

    await this.carsRepository.create(carExists)

    return carExists
  }
}

export { CreateCarSpecificationUseCase }
