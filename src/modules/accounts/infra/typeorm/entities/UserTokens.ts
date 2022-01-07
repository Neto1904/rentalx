import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

import { User } from './User'

@Entity('users_tokens')
class UserTokens {
  @PrimaryColumn()
  id: string

  @Column({ name: 'refresh_token' })
  refreshToken: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ name: 'user_id' })
  userId: string

  @Column({ name: 'expires_date' })
  expiresDate: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}

export { UserTokens }
