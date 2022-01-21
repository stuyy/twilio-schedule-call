import { Module } from '@nestjs/common';
import { TwilioModule } from '../twilio/twilio.module';
import { VerifyPhoneController } from './verify.controller';

@Module({
  imports: [TwilioModule],
  controllers: [VerifyPhoneController],
})
export class VerifyModule {}
