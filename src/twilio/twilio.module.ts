import { Module } from '@nestjs/common';
import { Twilio } from 'twilio';
import { ConfigModule } from '@nestjs/config';
import { SERVICES } from '../utils/constants';
import { TwilioService } from './twilio.service';
// import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';

const envFilePath =
  process.env.ENVIRONMENT === 'DEVELOPMENT'
    ? '.env.development'
    : '.env.production';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
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
    // {
    //   provide: 'VOICE_RESPONSE',
    //   useClass: VoiceResponse,
    // },
  ],
  exports: [
    {
      provide: SERVICES.TWILIO_SERVICE,
      useClass: TwilioService,
    },
  ],
})
export class TwilioModule {}
