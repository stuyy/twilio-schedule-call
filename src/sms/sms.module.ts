import { Module } from '@nestjs/common';
import { TwilioModule } from '../twilio/twilio.module';
import { SERVICES } from '../utils/constants';
import { SMSMessengerService } from './sms.service';

@Module({
  imports: [TwilioModule],
  providers: [
    {
      provide: SERVICES.SMS_SERVICE,
      useClass: SMSMessengerService,
    },
  ],
})
export class SmsModule {}
