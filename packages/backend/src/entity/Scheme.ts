import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, OneToMany } from 'typeorm';
import { User } from './User';
import { Channel } from './Channel';

@Entity()
export class Scheme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.schemes)
  users: User[];

  @OneToMany(() => Channel, (channel) => channel.scheme)
  channels: Channel[];

  @CreateDateColumn()
  createdAt: Date;
}
