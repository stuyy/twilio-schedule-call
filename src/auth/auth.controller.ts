import { Body, Controller, Inject, Post, UsePipes } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { IUserService } from '../user/user.interface';
import { ROUTES, SERVICES } from '../utils/constants';
import { IAuthService } from './auth.interface';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { ValidatePasswordPipe } from './pipes/ValidatePasswordPipe';

@Controller(ROUTES.AUTH)
export class AuthController {
  constructor(
    @Inject(SERVICES.USER) private readonly userService: IUserService,
    @Inject(SERVICES.AUTH) private readonly authService: IAuthService,
  ) {}

  @Post('register')
  @UsePipes(ValidatePasswordPipe)
  async register(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);
    return instanceToPlain(newUser);
  }
}
