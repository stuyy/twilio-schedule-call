import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  status: string;
}
