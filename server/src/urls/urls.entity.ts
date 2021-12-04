import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  url_id: number;

  @Column({ type: 'tinytext' })
  url: string;

  @Column({ length: 256 })
  hobbitlink: string;

  @Column('int')
  clicks: number;

  @Column('boolean')
  active: boolean;

  @Column()
  expire_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
