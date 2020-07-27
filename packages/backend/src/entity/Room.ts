import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Channel } from './Channel';
import { Message } from './Message';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Channel, (channel) => channel.rooms)
  channel: Channel;

  @ManyToMany(() => User, (user) => user.rooms)
  users: User[];

  @OneToMany(() => Message, (message) => message.room)
  @JoinColumn()
  messages: Message[];

  @CreateDateColumn()
  createdAt: Date;
}
