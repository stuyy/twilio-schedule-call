import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ITwilioService } from '../twilio/twilio.inteface';
import { SERVICES } from '../utils/constants';
import { ScheduleCallDto } from './calls.dto';
import { ICallsService } from './calls.interface';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { AuthenticatedGuard } from '../auth/utils/Guards';
import { AuthUser } from '../utils/decorators';
import { User } from '../typeorm/entities/User';

@UseGuards(AuthenticatedGuard)
@Controller('calls')
export class CallsController {
  constructor(
    @Inject(SERVICES.CALLS) private readonly callsService: ICallsService,
    @Inject(SERVICES.TWILIO_SERVICE)
    private readonly twilioService: ITwilioService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  @Get()
  async getCalls(@AuthUser() user: User) {
    const calls = await this.callsService.getCalls(user.id);
    const scheduledCalls = this.schedulerRegistry.getCronJobs();
    const activeCalls = calls.filter((call) =>
      scheduledCalls.get(call.id.toString()),
    );
    return activeCalls;
  }

  @Post()
  @UsePipes(ValidationPipe)
  async scheduleCall(
    @AuthUser() user: User,
    @Body() scheduleCallDto: ScheduleCallDto,
  ) {
    console.log(scheduleCallDto);
    const call = await this.callsService.scheduleCall(user, scheduleCallDto);
    const job = new CronJob(new Date(call.scheduledDate), async () =>
      this.callsService
        .startCall(call)
        .then((call) => {
          console.log(call);
          console.log(`Call Successful`);
        })
        .catch((err) => console.log(err)),
    );
    this.schedulerRegistry.addCronJob(call.id.toString(), job);
    console.log(this.schedulerRegistry.getCronJobs());
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
