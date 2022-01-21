import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { instanceToPlain } from 'class-transformer';
import { User } from '../../typeorm/entities/User';
import { IUserService } from '../../user/user.interface';
import { SERVICES } from '../../utils/constants';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(SERVICES.USER)
    private readonly userService: IUserService,
  ) {
    super();
  }
  serializeUser(user: User, done) {
    done(null, user.id);
  }
  async deserializeUser(id: number, done) {
    const user = await this.userService.findUser({ id });
    return user ? done(null, instanceToPlain(user)) : done(null, null);
  }
}
