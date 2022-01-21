import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { CreateUserParams, FindUserParams } from '../utils/types';
import { IUserService } from './user.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  createUser(params: CreateUserParams): Promise<User> {
    const newUser = this.userRepository.create(params);
    return this.userRepository.save(newUser);
  }
  findUser(params: FindUserParams): Promise<User> {
    return this.userRepository.findOne(params);
  }
}
