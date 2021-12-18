import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { SERVICES } from '../../utils/constants';
import { ScheduleCallDto } from '../dto/ScheduleCallDto';
import { ICallsService } from '../interfaces/CallsService';

@Controller('calls')
export class CallsController {
  constructor(
    @Inject(SERVICES.CALLS) private readonly callsService: ICallsService,
  ) {}

  @Get()
  getCall() {
    return this.callsService.getCall();
  }

  @Post()
  scheduleCall(@Body() scheduleCallDto: ScheduleCallDto) {
    return this.callsService.scheduleCall(scheduleCallDto);
  }
}
