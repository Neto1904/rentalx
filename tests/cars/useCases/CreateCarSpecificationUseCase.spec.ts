import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory'
import { CreateCarSpecificationUseCase } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationUseCase'
import { AppError } from '@shared/errors/AppError'

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationRepositoryInMemory: SpecificationRepositoryInMemory

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory
    )
  })

  it('should not be able to create specification for non-existing car', async () => {
    const carId = '1234'
    const specificationId = ['1234']
    await expect(
      createCarSpecificationUseCase.execute({ carId, specificationId })
    ).rejects.toEqual(new AppError('Car does not exist'))
  })

  it('should create a car specification', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'test',
      description: 'test description',
      dailyRate: 100,
      licensePlate: 'test license plate',
      fineAmount: 100,
      brand: 'test brand',
      categoryId: 'test category',
    })
    const specification = await specificationRepositoryInMemory.create({
      name: 'test specification',
      description: 'test description',
    })
    const response = await createCarSpecificationUseCase.execute({
      carId: car.id,
      specificationId: [specification.id],
    })

    expect(response).toHaveProperty('specifications')
    expect(response.specifications.length).toBe(1)
  })
})
