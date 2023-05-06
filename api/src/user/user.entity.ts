import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PASSWORD_MAX_CHAR, USERNAME_MAX_CHAR } from './user.interface';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: USERNAME_MAX_CHAR, unique: true })
  username: string;

  @Column('varchar', { length: PASSWORD_MAX_CHAR })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
