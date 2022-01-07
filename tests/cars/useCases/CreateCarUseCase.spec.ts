import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { CreateCarUseCase } from '@modules/cars/useCases/createCar/CreateCarUseCase'
import { AppError } from '@shared/errors/AppError'

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create a Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it('should be able to create a new Car', async () => {
    const car = await createCarUseCase.execute({
      name: 'test',
      description: 'test description',
      dailyRate: 100,
      licensePlate: 'test license plate',
      fineAmount: 100,
      brand: 'test brand',
      categoryId: 'test category',
    })
    expect(car).toHaveProperty('id')
  })

  it('should not be able to create a car with existing license plate', async () => {
    await createCarUseCase.execute({
      name: 'car1',
      description: 'test description',
      dailyRate: 100,
      licensePlate: 'test',
      fineAmount: 100,
      brand: 'test brand',
      categoryId: 'test category',
    })
    await expect(
      createCarUseCase.execute({
        name: 'car2',
        description: 'test description',
        dailyRate: 100,
        licensePlate: 'test',
        fineAmount: 100,
        brand: 'test brand',
        categoryId: 'test category',
      })
    ).rejects.toEqual(new AppError('Car already exists'))
  })

  it('should be able to create a car with available true as default', async () => {
    const car = await createCarUseCase.execute({
      name: 'car1',
      description: 'test description',
      dailyRate: 100,
      licensePlate: 'test',
      fineAmount: 100,
      brand: 'test brand',
      categoryId: 'test category',
    })

    expect(car.available).toBe(true)
  })
})
