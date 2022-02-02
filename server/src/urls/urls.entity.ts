import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Url {
  @PrimaryColumn({ length: 256 })
  hobbitLink: string;

  @Column({ type: 'tinytext' })
  url: string;

  @Column('int', { default: 0 })
  clicks: number;

  @Column('boolean', { default: false })
  active: boolean;

  @CreateDateColumn()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
