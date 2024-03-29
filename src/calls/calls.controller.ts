import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SERVICES } from '../utils/constants';
import { ScheduleCallDto } from './calls.dto';
import { ICallsService } from './calls.interface';
import { CronJob } from 'cron';
import { AuthenticatedGuard } from '../auth/utils/Guards';
import { AuthUser } from '../utils/decorators';
import { User } from '../typeorm/entities/User';
import { ISchedulerService } from '../scheduler/scheduler.interface';
import { ISMSMessengerService } from '../sms/sms.interface';

@Controller('calls')
export class CallsController {
  constructor(
    @Inject(SERVICES.CALLS) private readonly callsService: ICallsService,
    @Inject(SERVICES.SCHEDULER)
    private readonly schedulerService: ISchedulerService,
    @Inject(SERVICES.SMS_SERVICE)
    private readonly smsService: ISMSMessengerService,
  ) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  async getCalls(@AuthUser() user: User) {
    return this.schedulerService.getCronJobsByUser(user.id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthenticatedGuard)
  async scheduleCall(
    @AuthUser() user: User,
    @Body() scheduleCallDto: ScheduleCallDto,
  ) {
    console.log(scheduleCallDto.scheduledDate);
    const call = await this.callsService.scheduleCall(user, scheduleCallDto);
    const job = new CronJob(new Date(call.scheduledDate), () =>
      this.callsService.jobScheduleCallback(call),
    );
    this.schedulerService.scheduleCronJob(call.id.toString(), job);
  }

  @Post('handle')
  handleCall(@Body() body, @Query('recipient') recipient: string) {
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

  @Put('cancel/:callId')
  @UseGuards(AuthenticatedGuard)
  async cancelCall(@AuthUser() user: User, @Param('callId') callId: string) {
    const { id } = user;
    await this.callsService.cancelCall(id, callId);
    await this.smsService.sendSMS({
      to: user.mobile,
      from: process.env.TWILIO_PHONE_NUMBER,
      body: `Your scheduled call was cancelled.`,
    });
    return this.schedulerService.getCronJobsByUser(id);
  }

  @Put('start/:callId')
  @UseGuards(AuthenticatedGuard)
  async startScheduledCall(
    @AuthUser() user: User,
    @Param('callId') callId: string,
  ) {
    const { id } = user;
    await this.callsService.startScheduledCall(id, callId);
  }
}
