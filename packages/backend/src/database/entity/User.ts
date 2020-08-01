import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { DepartmentRole } from './DepartmentRole';
import { Room } from './Room';
import { UserType } from '../../interfaces';
import { SchemeRole } from './SchemeRole';

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

  @OneToMany(() => DepartmentRole, (departmentRole) => departmentRole.user)
  departmentRoles: DepartmentRole[];

  @OneToMany(() => SchemeRole, (schemeRole) => schemeRole.user)
  schemeRoles: SchemeRole[];

  @ManyToMany(() => Room, (room) => room.users)
  @JoinTable()
  rooms: Room[];

  @Column()
  isVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
