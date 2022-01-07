import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO'
import { Rental } from '../infrra/typeorm/entity/Rental'

interface IRentalsRepository {
  findActiveCar(carId: string): Promise<Rental>
  findActiveUser(userId: string): Promise<Rental>
  create({
    userId,
    carId,
    expectedReturnDate,
  }: ICreateRentalDTO): Promise<Rental>
  findById(id: string): Promise<Rental>
  findByUserId(userId: string): Promise<Rental[]>
}

export { IRentalsRepository }
