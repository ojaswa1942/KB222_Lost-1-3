import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Department } from './Department';
import { Scheme } from './Scheme';
import { Room } from './Room';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Department, (department) => department.channels)
  department: Department;

  @ManyToOne(() => Scheme, (scheme) => scheme.channels)
  scheme: Scheme;

  @OneToMany(() => Room, (room) => room.channel)
  rooms: Room[];

  @CreateDateColumn()
  createdAt: Date;
}
