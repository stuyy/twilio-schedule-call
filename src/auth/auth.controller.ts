import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { IUserService } from '../user/user.interface';
import { ROUTES, SERVICES } from '../utils/constants';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { ValidatePasswordPipe } from './pipes/ValidatePasswordPipe';
import { LocalAuthGuard } from './utils/Guards';

@Controller(ROUTES.AUTH)
export class AuthController {
  constructor(
    @Inject(SERVICES.USER) private readonly userService: IUserService,
  ) {}

  @Post('register')
  @UsePipes(ValidatePasswordPipe)
  async register(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);
    return instanceToPlain(newUser);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login() {
    return;
  }
}
