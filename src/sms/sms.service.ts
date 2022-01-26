import { Inject, Injectable } from '@nestjs/common';
import { ITwilioService } from '../twilio/twilio.inteface';
import { SERVICES } from '../utils/constants';
import { CreateSMSDetails } from '../utils/types';
import { ISMSMessengerService } from './sms.interface';

@Injectable()
export class SMSMessengerService implements ISMSMessengerService {
  constructor(
    @Inject(SERVICES.TWILIO_SERVICE)
    private readonly twilioService: ITwilioService,
  ) {}
  sendSMS(smsDetails: CreateSMSDetails) {
    return this.twilioService.sendSMS(smsDetails);
  }
}
