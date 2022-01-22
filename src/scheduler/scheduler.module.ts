import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Call } from '../typeorm/entities/Call';
import { SERVICES } from '../utils/constants';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [TypeOrmModule.forFeature([Call])],
  providers: [
    {
      provide: SERVICES.SCHEDULER,
      useClass: SchedulerService,
    },
  ],
  exports: [
    {
      provide: SERVICES.SCHEDULER,
      useClass: SchedulerService,
    },
  ],
})
export class SchedulerModule {}
