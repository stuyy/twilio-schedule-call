import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ITwilioService } from '../twilio/twilio.inteface';
import { ROUTES, SERVICES } from '../utils/constants';

@Controller(ROUTES.VERIFY)
export class VerifyPhoneController {
  constructor(
    @Inject(SERVICES.TWILIO_SERVICE)
    private readonly twilioService: ITwilioService,
  ) {}

  @Post('')
  async verifyPhoneNumber(@Body('mobile') mobile: string) {
    return this.twilioService.createVerifyService(mobile);
  }
}
