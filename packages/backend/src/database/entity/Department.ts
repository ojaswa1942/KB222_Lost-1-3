import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, OneToMany } from 'typeorm';
import { Channel } from './Channel';
import { DepartmentRole } from './DepartmentRole';
@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => DepartmentRole, (departmentRole) => departmentRole.department)
  departmentRoles: DepartmentRole[];

  @OneToMany(() => Channel, (channel) => channel.department)
  channels: Channel[];

  @CreateDateColumn()
  createdAt: Date;
}
