import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, OneToMany } from 'typeorm';
import { Channel } from './Channel';
import { SchemeRole } from './SchemeRole';

@Entity()
export class Scheme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => SchemeRole, (schemeRole) => schemeRole.scheme)
  schemeRoles: SchemeRole[];

  @OneToMany(() => Channel, (channel) => channel.scheme)
  channels: Channel[];

  @CreateDateColumn()
  createdAt: Date;
}
