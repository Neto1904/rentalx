import { Expose } from 'class-transformer'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('users')
class User {
  @PrimaryColumn()
  id?: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  avatar: string

  @Column({ name: 'driver_license' })
  driverLicense: string

  @Column({ name: 'is_admin' })
  isAdmin: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Expose({ name: 'avatarUrl' })
  avatarUrl(): string {
    switch (process.env.DISK) {
      case 'local':
        return `http://localhost:3333/avatar/${this.avatar}`
      case 's3':
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`
      default:
        return null
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}

export { User }
