import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Department } from './Department';
import { Scheme } from './Scheme';
import { Room } from './Room';
import { UserType } from '../../interfaces';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  hash: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.STATE,
  })
  type: UserType;

  @ManyToMany(() => Department, (department) => department.users)
  @JoinTable()
  departments: Department[];

  @ManyToMany(() => Scheme, (scheme) => scheme.users)
  @JoinTable()
  schemes: Scheme[];

  @ManyToMany(() => Room, (room) => room.users)
  @JoinTable()
  rooms: Room[];

  @Column()
  isVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
