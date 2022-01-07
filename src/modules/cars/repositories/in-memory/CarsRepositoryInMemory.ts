import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'

import { ICarsRepository } from '../ICarsRepository'

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []

  async create({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
    })
    this.cars.push(car)
    return car
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.cars.find((car) => car.licensePlate === licensePlate)
  }

  async findAvailable(
    brand?: string,
    categoryId?: string,
    name?: string
  ): Promise<Car[]> {
    let cars = this.cars.filter((car) => car.available === true)

    if (brand || categoryId || name) {
      cars = cars.filter(
        (car) =>
          (brand && brand === car.brand) ||
          (categoryId && categoryId === car.categoryId) ||
          (name && name === car.name)
      )
    }
    return cars
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id)
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id)
    this.cars[findIndex].available = available
  }
}

export { CarsRepositoryInMemory }
