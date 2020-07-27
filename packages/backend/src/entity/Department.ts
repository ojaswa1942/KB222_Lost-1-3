import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, OneToMany } from 'typeorm';
import { User } from './User';
import { Channel } from './Channel';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.departments)
  users: User[];

  @OneToMany(() => Channel, (channel) => channel.department)
  channels: Channel[];

  @CreateDateColumn()
  createdAt: Date;
}
