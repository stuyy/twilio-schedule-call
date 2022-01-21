import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from '../user/user.interface';
import { SERVICES } from '../utils/constants';
import { IAuthService } from './auth.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(SERVICES.USER) private readonly userService: IUserService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findUser({ email });
    return user;
  }
}
