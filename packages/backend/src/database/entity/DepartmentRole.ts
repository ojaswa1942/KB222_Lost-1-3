import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { Department } from './Department';
import { DeptRoles } from '../../interfaces';

@Entity()
export class DepartmentRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: DeptRoles,
    default: DeptRoles.VIEWER,
  })
  role: DeptRoles;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.departmentRoles)
  user: User;

  @Column()
  departmentId: number;

  @ManyToOne(() => Department, (department) => department.departmentRoles, {
    eager: true,
  })
  department: Department;
}
