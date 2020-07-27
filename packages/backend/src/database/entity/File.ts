import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Column } from 'typeorm';
import { Message } from './Message';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  key: string;

  @ManyToOne(() => Message, (message) => message.files)
  message: Message;

  @CreateDateColumn()
  createdAt: Date;
}
