import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Call } from './Call';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true })
  mobile: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ default: false })
  emailVerified: boolean;

  @OneToMany(() => Call, (call) => call.user)
  calls: Call[];
}
