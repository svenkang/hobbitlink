import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { HOBBIT_LINK_MAX_CHAR } from './url.interface';

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: HOBBIT_LINK_MAX_CHAR })
  hobbitLink: string;

  @Column('tinytext')
  url: string;

  @Column('int', { default: 0 })
  clicks: number;

  @Column('boolean', { default: true })
  isActive: boolean;

  @CreateDateColumn()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
