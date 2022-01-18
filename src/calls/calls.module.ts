import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwilioModule } from '../twilio/twilio.module';
import { Call } from '../typeorm/entities/Call';
import { SERVICES } from '../utils/constants';
import { CallsController } from './calls.controller';
import { CallsService } from './calls.service';

@Module({
  imports: [TypeOrmModule.forFeature([Call]), TwilioModule],
  controllers: [CallsController],
  providers: [
    {
      provide: SERVICES.CALLS,
      useClass: CallsService,
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
