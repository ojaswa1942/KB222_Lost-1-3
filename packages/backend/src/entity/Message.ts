import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Column, OneToMany } from 'typeorm';
import { Room } from './Room';
import { User } from './User';
import { File } from './File';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @Column()
  isNotification: boolean;

  @OneToMany(() => File, (file) => file.message)
  files: File[];

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Room, (room) => room.messages)
  room: Room;

  @CreateDateColumn()
  createdAt: Date;
}
