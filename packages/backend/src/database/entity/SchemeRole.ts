import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Scheme } from './Scheme';
import { SchRoles } from '../../interfaces';

@Entity()
export class SchemeRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: SchRoles,
    default: SchRoles.VIEWER,
  })
  role: SchRoles;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.schemeRoles)
  user: User;

  @Column()
  schemeId: number;

  @ManyToOne(() => Scheme, (scheme) => scheme.schemeRoles, {
    eager: true,
  })
  scheme: Scheme;
}
