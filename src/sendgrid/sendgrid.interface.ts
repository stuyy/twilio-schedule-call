import { User } from '../typeorm/entities/User';

export interface EmailService {
  sendVerificationEmail(user: User, token: string);
}
