import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Channel } from './Channel';
import { DepartmentRole } from './DepartmentRole';
@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => DepartmentRole, (departmentRole) => departmentRole.department)
  departmentRoles: DepartmentRole[];

  @OneToMany(() => Channel, (channel) => channel.department)
  channels: Channel[];

  @CreateDateColumn()
  createdAt: Date;
}
