import { Inject, Injectable } from '@nestjs/common';
import { ITwilioService } from '../twilio/twilio.inteface';
import { SERVICES } from '../utils/constants';
import { ISMSMessengerService } from './sms.interface';

@Injectable()
export class SMSMessengerService implements ISMSMessengerService {
  constructor(
    @Inject(SERVICES.TWILIO_SERVICE)
    private readonly twilioService: ITwilioService,
  ) {}
  sendSMS() {}
}
