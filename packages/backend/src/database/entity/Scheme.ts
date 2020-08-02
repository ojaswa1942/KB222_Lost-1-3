import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Channel } from './Channel';
import { SchemeRole } from './SchemeRole';

@Entity()
export class Scheme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  budget: number;

  @Column({
    default: 0,
  })
  transferredAmount: number;

  @OneToMany(() => SchemeRole, (schemeRole) => schemeRole.scheme)
  schemeRoles: SchemeRole[];

  @OneToMany(() => Channel, (channel) => channel.scheme)
  channels: Channel[];

  @CreateDateColumn()
  createdAt: Date;
}
