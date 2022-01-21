import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ITwilioService } from '../twilio/twilio.inteface';
import { ROUTES, SERVICES } from '../utils/constants';
import { MobilePhoneDto } from './dtos/MobilePhoneDto';
import { VerifyPhoneDto } from './dtos/VerifyPhoneDto';

@Controller(ROUTES.VERIFY)
export class VerifyPhoneController {
  constructor(
    @Inject(SERVICES.TWILIO_SERVICE)
    private readonly twilioService: ITwilioService,
  ) {}

  @Post('')
  async verifyPhoneNumber(@Body() { mobile }: MobilePhoneDto) {
    return this.twilioService.createVerifyService(mobile);
  }

  @Post('code')
  async verifyCode(@Body() { mobile, code }: VerifyPhoneDto) {
    const data = await this.twilioService.verifyCode(mobile, code);
    if (data.status !== 'approved')
      throw new HttpException('Verification Failed', HttpStatus.BAD_REQUEST);
    return data;
  }
}
