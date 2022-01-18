import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ITwilioService } from '../twilio/twilio.inteface';
import { SERVICES } from '../utils/constants';
import { ScheduleCallDto } from './call.dto';
import { ICallsService } from './calls.interface';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Controller('calls')
export class CallsController {
  constructor(
    @Inject(SERVICES.CALLS) private readonly callsService: ICallsService,
    @Inject(SERVICES.TWILIO_SERVICE)
    private readonly twilioService: ITwilioService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  @Get()
  getCall() {
    return this.callsService.getCall();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async scheduleCall(@Body() scheduleCallDto: ScheduleCallDto) {
    const call = await this.callsService.scheduleCall(scheduleCallDto);
    const job = new CronJob(new Date(call.scheduledDate), () =>
      this.callsService.startCall(call),
    );
    this.schedulerRegistry.addCronJob(`Job ${call.id}`, job);
    job.start();
  }

  @Post('start-call')
  startCall(@Body() body, @Query('recipient') recipient: string) {
    if (!body.Digits)
      throw new HttpException('Invalid Request', HttpStatus.BAD_REQUEST);
    return body.Digits == 1
      ? `
      <Response>
        <Say>Calling</Say>
        <Dial>${recipient}</Dial>
      </Response>
    `
      : `
      <Response>
        <Say>Thank you, good bye!</Say>
        <Hangup />
      </Response>
      `;
  }
}
