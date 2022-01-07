import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { ListAvailableCarsUseCase } from '@modules/cars/useCases/listCars/ListAvailableCarsUseCase'

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    )
  })

  it('should list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'test',
      description: 'test description',
      dailyRate: 100,
      licensePlate: 'test license plate',
      fineAmount: 100,
      brand: 'test brand',
      categoryId: 'test category',
    })

    const cars = await listAvailableCarsUseCase.execute({})
    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'test',
      description: 'test description',
      dailyRate: 100,
      licensePlate: 'test license plate',
      fineAmount: 100,
      brand: 'test brand',
      categoryId: 'test category',
    })

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'test brand',
    })
    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'test',
      description: 'test description',
      dailyRate: 100,
      licensePlate: 'test license plate',
      fineAmount: 100,
      brand: 'test brand',
      categoryId: 'test category',
    })

    const cars = await listAvailableCarsUseCase.execute({
      name: 'test',
    })
    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'test',
      description: 'test description',
      dailyRate: 100,
      licensePlate: 'test license plate',
      fineAmount: 100,
      brand: 'test brand',
      categoryId: 'test category',
    })

    const cars = await listAvailableCarsUseCase.execute({
      categoryId: 'test category',
    })
    expect(cars).toEqual([car])
  })
})
