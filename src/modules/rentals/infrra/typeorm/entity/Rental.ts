import {
  Entity,
  PrimaryColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'

@Entity('rentals')
class Rental {
  @PrimaryColumn()
  id: string

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id', referencedColumnName: 'id' })
  car: Car

  @Column({ name: 'car_id' })
  carId: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  @Column({ name: 'user_id' })
  userId: string

  @Column({ name: 'start_date' })
  startDate: Date

  @Column({ name: 'end_date' })
  endDate: Date

  @Column({ name: 'expected_return_date' })
  expectedReturnDate: Date

  @Column()
  total: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}

export { Rental }
