import { Module } from '@nestjs/common';
import { JwtServiceModule } from '../jwt/jwt.module';
import { SendgridModule } from '../sendgrid/sendgrid.module';
import { TwilioModule } from '../twilio/twilio.module';
import { UserModule } from '../user/user.module';
import { SERVICES } from '../utils/constants';
import { VerifyController } from './verify.controller';
import { VerifyService } from './verify.service';

@Module({
  imports: [TwilioModule, UserModule, SendgridModule, JwtServiceModule],
  controllers: [VerifyController],
  providers: [
    {
      provide: SERVICES.VERIFY,
      useClass: VerifyService,
    },
  ],
})
export class VerifyModule {}
