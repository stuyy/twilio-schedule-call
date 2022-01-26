import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulerModule } from '../scheduler/scheduler.module';
import { SMSMessengerService } from '../sms/sms.service';
import { TwilioModule } from '../twilio/twilio.module';
import { Call } from '../typeorm/entities/Call';
import { SERVICES } from '../utils/constants';
import { CallsController } from './calls.controller';
import { CallsService } from './calls.service';

@Module({
  imports: [TypeOrmModule.forFeature([Call]), TwilioModule, SchedulerModule],
  controllers: [CallsController],
  providers: [
    {
      provide: SERVICES.CALLS,
      useClass: CallsService,
    },
    {
      provide: SERVICES.SMS_SERVICE,
      useClass: SMSMessengerService,
    },
  ],
  exports: [
    {
      provide: SERVICES.CALLS,
      useClass: CallsService,
    },
  ],
})
export class CallsModule {}
