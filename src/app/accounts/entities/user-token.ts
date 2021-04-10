import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { User } from './user';

type IUserTokenType = 'refresh_token' | 'reset_password_token';

@Entity('user_tokens')
class UserToken {
  @PrimaryColumn()
  id?: string;

  @Column()
  type: IUserTokenType;

  @Column()
  token: string;

  @Column()
  expiration_date: Date;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { UserToken, IUserTokenType };
