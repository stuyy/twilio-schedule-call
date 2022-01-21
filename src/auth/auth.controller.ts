import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { User } from '../typeorm/entities/User';
import { IUserService } from '../user/user.interface';
import { ROUTES, SERVICES } from '../utils/constants';
import { AuthUser } from '../utils/decorators';
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

  @Get('status')
  async getAuthStatus(@AuthUser() user: User) {
    return user;
  }
}
