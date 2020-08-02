import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Department } from './Department';
import { Scheme } from './Scheme';
import { Room } from './Room';
import { Transaction } from './Transaction';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  departmentId: number;

  @ManyToOne(() => Department, (department) => department.channels)
  department: Department;

  @Column()
  schemeId: number;

  @ManyToOne(() => Scheme, (scheme) => scheme.channels)
  scheme: Scheme;

  @OneToMany(() => Room, (room) => room.channel)
  rooms: Room[];

  @OneToMany(() => Transaction, (transaction) => transaction.channel)
  transactions: Transaction[];

  @CreateDateColumn()
  createdAt: Date;
}
