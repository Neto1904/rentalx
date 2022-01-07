import { getRepository, Repository } from 'typeorm'

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'

import { Car } from '../entities/Car'

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async create({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      categoryId,
      brand,
      specifications,
      id,
    })

    await this.repository.save(car)

    return car
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = this.repository.findOne({ licensePlate })
    return car
  }

  async findAvailable(
    brand?: string,
    categoryId?: string,
    name?: string
  ): Promise<Car[]> {
    const query = await this.repository
      .createQueryBuilder('cars')
      .where('available = :available', { available: true })

    if (brand) {
      query.andWhere('brand = :brand', { brand })
    }
    if (categoryId) {
      query.andWhere('category_id = :categoryId', { categoryId })
    }
    if (name) {
      query.andWhere('name = :name', { name })
    }

    const cars = await query.getRawMany()

    return cars
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne({ id })
    return car
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder('cars')
      .update()
      .returning('*')
      .set({ available })
      .where('id = :id', { id })
      .execute()
  }
}

export { CarsRepository }
