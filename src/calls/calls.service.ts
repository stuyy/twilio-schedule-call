import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CronCommand, CronJob } from 'cron';
import { MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { ISchedulerService } from '../scheduler/scheduler.interface';
import { ITwilioService } from '../twilio/twilio.inteface';
import { Call } from '../typeorm/entities/Call';
import { User } from '../typeorm/entities/User';
import { SERVICES } from '../utils/constants';
import { ScheduleCallDto } from './calls.dto';
import { ICallsService } from './calls.interface';

@Injectable()
export class CallsService implements ICallsService, OnModuleInit {
  constructor(
    @InjectRepository(Call) private readonly callRepository: Repository<Call>,
    @Inject(SERVICES.TWILIO_SERVICE)
    private readonly twilioService: ITwilioService,
    @Inject(SERVICES.SCHEDULER)
    private readonly scheduleService: ISchedulerService,
  ) {}

  async onModuleInit() {
    console.log('Initializing Scheduler Service');
    const calls = await this.callRepository.find({
      where: { scheduledDate: MoreThan(new Date()) },
    });
    calls.forEach((call) => {
      console.log(`Scheduling Call ${call.id}`);
      const job = new CronJob(new Date(call.scheduledDate), () =>
        this.jobScheduleCallback(call),
      );
      this.scheduleService.scheduleCronJob(call.id.toString(), job);
    });
  }

  async jobScheduleCallback(call: Call) {
    try {
      const callResponse = await this.startCall(call);
      console.log(callResponse);
      await this.callRepository.update({ id: call.id }, { status: 'complete' });
      console.log('Updating...');
    } catch (err) {
      console.log(err);
    }
  }

  scheduleCall(user: User, scheduleCallDto: ScheduleCallDto) {
    const call = this.callRepository.create({ ...scheduleCallDto, user });
    return this.callRepository.save(call);
  }

  getCalls(id: number) {
    return this.callRepository.find({
      where: {
        user: {
          id,
        },
        scheduledDate: MoreThanOrEqual(new Date()),
      },
    });
  }
  updateCall() {
    throw new Error('Method not implemented.');
  }
  cancelCall() {
    throw new Error('Method not implemented.');
  }
  startCall(call: Call) {
    return this.twilioService.startCall(call);
  }
}
