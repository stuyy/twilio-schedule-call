import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SERVICES } from '../utils/constants';
import { TwilioService } from './services/twilio.service';
import { Twilio } from 'twilio';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
    }),
  ],
  providers: [
    {
      provide: SERVICES.TWILIO_SERVICE,
      useClass: TwilioService,
    },
    {
      provide: SERVICES.TWILIO_CLIENT,
      useValue: new Twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN,
      ),
    },
  ],
})
export class TwilioModule {}
