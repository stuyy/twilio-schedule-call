import { Module } from '@nestjs/common';
import { SERVICES } from '../utils/constants';
import { CallsController } from './controllers/calls.controller';
import { CallsService } from './services/calls.service';

@Module({
  controllers: [CallsController],
  providers: [
    {
      provide: SERVICES.CALLS,
      useClass: CallsService,
    },
  ],
})
export class CallsModule {}
