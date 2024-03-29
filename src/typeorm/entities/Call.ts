import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ScheduledCallStatus } from '../../utils/types';
import { User } from './User';

@Entity({ name: 'calls' })
export class Call {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  caller: string;

  @Column()
  recipient: string;

  @Column()
  description: string;

  @Column({ name: 'scheduled_date' })
  scheduledDate: Date;

  @Column({ default: 'scheduled' })
  status: ScheduledCallStatus;

  @ManyToOne(() => User, (user) => user.calls)
  user: User;
}
