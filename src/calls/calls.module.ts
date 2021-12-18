import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Call } from '../typeorm/entities/Call';
import { SERVICES } from '../utils/constants';
import { CallsController } from './controllers/calls.controller';
import { CallsService } from './services/calls.service';

@Module({
  imports: [TypeOrmModule.forFeature([Call])],
  controllers: [CallsController],
  providers: [
    {
      provide: SERVICES.CALLS,
      useClass: CallsService,
    },
  ],
})
export class CallsModule {}
