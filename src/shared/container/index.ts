import { container } from 'tsyringe'

import '@shared/container/providers'

import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository'
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { RentalsRepository } from '@modules/rentals/infrra/typeorm/repositories/RentalsRepository'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'

import { UsersRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository'
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository'
import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository'

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
)

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository)

container.registerSingleton<ICarsImagesRepository>(
  'CarsImagesRepository',
  CarsImagesRepository
)

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository
)

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository
)
