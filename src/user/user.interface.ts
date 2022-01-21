import { User } from '../typeorm/entities/User';
import {
  CreateUserParams,
  FindUserParams,
  UpdateUserParams,
} from '../utils/types';

export interface IUserService {
  createUser(params: CreateUserParams): Promise<User>;
  findUser(params: FindUserParams): Promise<User>;
  updateUser(id: number, params: UpdateUserParams);
}
