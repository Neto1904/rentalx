import { inject, injectable } from 'tsyringe'

import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository'
import { IStorageProvider } from '@shared/container/providers/storageProvider/IStorageProvider'

interface IRequest {
  carId: string
  imageNames: string[]
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: CarsImagesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}
  async execute({ carId, imageNames }: IRequest) {
    imageNames.map(async (imageName) => {
      await this.carsImagesRepository.create(carId, imageName)
      await this.storageProvider.save(imageName, 'cars')
    })
  }
}

export { UploadCarImageUseCase }
