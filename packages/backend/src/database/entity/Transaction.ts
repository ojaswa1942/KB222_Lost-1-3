import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { Channel } from './Channel';
import { TrxState } from '../../interfaces';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  trxId: string;

  @Column()
  amount: number;

  @Column({
    type: 'enum',
    enum: TrxState,
    default: TrxState.INITIATED,
  })
  state: TrxState;

  @ManyToOne(() => Channel, (channel) => channel.transactions)
  channel: Channel;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
