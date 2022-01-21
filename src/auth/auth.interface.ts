import { User } from '../typeorm/entities/User';

export interface IAuthService {
  validateUser(email: string, password: string): Promise<User | undefined>;
}
