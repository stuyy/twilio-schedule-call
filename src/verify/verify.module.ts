import { Module } from '@nestjs/common';
import { TwilioModule } from '../twilio/twilio.module';
import { UserModule } from '../user/user.module';
import { SERVICES } from '../utils/constants';
import { VerifyPhoneController } from './verify.controller';
import { VerifyPhoneService } from './verify.service';

@Module({
  imports: [TwilioModule, UserModule],
  controllers: [VerifyPhoneController],
  providers: [
    {
      provide: SERVICES.VERIFY,
      useClass: VerifyPhoneService,
    },
  ],
})
export class VerifyModule {}
