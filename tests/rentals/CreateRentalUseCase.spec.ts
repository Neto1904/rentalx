import dayjs from 'dayjs'

import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory'
import { CreateRentalUseCase } from '@modules/rentals/useCases/createRental/CreateRentalUseCase'
import { DayJsDateProvider } from '@shared/container/providers/dateProvider/implementations/DayJsDateProvider'
import { AppError } from '@shared/errors/AppError'

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let dateProvider: DayJsDateProvider
let usersRepositoryInMemory: UsersRepositoryInMemory

describe('Create rental', () => {
  const expectedReturnDate = dayjs().add(3, 'day').toDate()
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    dateProvider = new DayJsDateProvider()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider,
      carsRepositoryInMemory
    )
  })

  it('should create a rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car',
      brand: 'Car',
      dailyRate: 100,
      fineAmount: 100,
      description: 'Description',
      licensePlate: 'License',
      categoryId: 'Category',
    })

    const rental = await createRentalUseCase.execute({
      userId: '12345',
      carId: car.id,
      expectedReturnDate: expectedReturnDate,
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('startDate')
  })

  it('should not create rental if user already has one active', async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: 'Car',
      brand: 'Car',
      dailyRate: 100,
      fineAmount: 100,
      description: 'Description',
      licensePlate: 'License',
      categoryId: 'Category',
    })

    const car2 = await carsRepositoryInMemory.create({
      name: 'Car',
      brand: 'Car',
      dailyRate: 100,
      fineAmount: 100,
      description: 'Description',
      licensePlate: 'License',
      categoryId: 'Category',
    })

    const user = await usersRepositoryInMemory.create({
      driverLicense: 'License',
      email: 'user@example',
      name: 'user',
      password: 'password',
    })

    await createRentalUseCase.execute({
      userId: user.id,
      carId: car1.id,
      expectedReturnDate: expectedReturnDate,
    })
    await expect(
      createRentalUseCase.execute({
        userId: user.id,
        carId: car2.id,
        expectedReturnDate: expectedReturnDate,
      })
    ).rejects.toEqual(new AppError('User already have active rental'))
  })

  it('should not create rental if car is in use', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car',
      brand: 'Car',
      dailyRate: 100,
      fineAmount: 100,
      description: 'Description',
      licensePlate: 'License',
      categoryId: 'Category',
    })

    const user = await usersRepositoryInMemory.create({
      driverLicense: 'License',
      email: 'user@example',
      name: 'user',
      password: 'password',
    })

    await createRentalUseCase.execute({
      userId: user.id,
      carId: car.id,
      expectedReturnDate: expectedReturnDate,
    })
    await expect(
      createRentalUseCase.execute({
        userId: user.id,
        carId: car.id,
        expectedReturnDate: expectedReturnDate,
      })
    ).rejects.toEqual(new AppError('Car Unavailable'))
  })

  it('should not create rental with invalid rent time', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car',
      brand: 'Car',
      dailyRate: 100,
      fineAmount: 100,
      description: 'Description',
      licensePlate: 'License',
      categoryId: 'Category',
    })

    const user = await usersRepositoryInMemory.create({
      driverLicense: 'License',
      email: 'user@example',
      name: 'user',
      password: 'password',
    })

    await expect(
      createRentalUseCase.execute({
        userId: user.id,
        carId: car.id,
        expectedReturnDate: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError('Rental must be at least for 24 hours'))
  })
})
