import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticatedGuard } from '../auth/utils/Guards';
import { ITwilioService } from '../twilio/twilio.inteface';
import { User } from '../typeorm/entities/User';
import { ROUTES, SERVICES } from '../utils/constants';
import { AuthUser } from '../utils/decorators';
import { MobilePhoneDto } from './dtos/MobilePhoneDto';
import { VerifyPhoneDto } from './dtos/VerifyPhoneDto';
import { IVerifyService } from './verify.interface';

@UseGuards(AuthenticatedGuard)
@Controller(ROUTES.VERIFY)
export class VerifyController {
  constructor(
    @Inject(SERVICES.TWILIO_SERVICE)
    private readonly twilioService: ITwilioService,

    @Inject(SERVICES.VERIFY)
    private readonly verifyService: IVerifyService,
  ) {}

  @Post('')
  async verifyPhoneNumber(@Body() { mobile }: MobilePhoneDto) {
    return this.twilioService.createVerifyService(mobile);
  }

  @Post('code')
  async verifyCode(
    @AuthUser() { id: userId }: User,
    @Body() verifyPhoneDto: VerifyPhoneDto,
  ) {
    await this.verifyService.verifyPhoneNumber({
      userId,
      ...verifyPhoneDto,
    });
  }

  @Post('email')
  async verifyEmailAddress(@AuthUser() user: User) {
    await this.verifyService.verifyEmailAddress(user);
  }

  @Get('email/:token')
  async verifyEmailToken(
    @AuthUser() user: User,
    @Param('token') token: string,
    @Res() res: Response,
  ) {
    await this.verifyService.verifyEmailToken(user.id, token);
    res
      .cookie('showEmailVerified', true)
      .redirect(process.env.EMAIL_VERIFY_REDIRECT_URL);
  }
}
