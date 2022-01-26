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

@UseGuards(AuthenticatedGuard)
@Controller('calls')
export class CallsController {
  constructor(
    @Inject(SERVICES.CALLS) private readonly callsService: ICallsService,
    @Inject(SERVICES.SCHEDULER)
    private readonly schedulerService: ISchedulerService,
  ) {}

  @Get()
  async getCalls(@AuthUser() user: User) {
    return this.schedulerService.getCronJobsByUser(user.id);
  }

  @Post()
  @UsePipes(ValidationPipe)
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

  @Put('cancel/:callId')
  async cancelCall(@AuthUser() user: User, @Param('callId') callId: string) {
    const { id } = user;
    await this.callsService.cancelCall(id, callId);
    return this.schedulerService.getCronJobsByUser(id);
  }
}
