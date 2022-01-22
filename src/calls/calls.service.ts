import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { ITwilioService } from '../twilio/twilio.inteface';
import { Call } from '../typeorm/entities/Call';
import { User } from '../typeorm/entities/User';
import { SERVICES } from '../utils/constants';
import { ScheduleCallDto } from './calls.dto';
import { ICallsService } from './calls.interface';

@Injectable()
export class CallsService implements ICallsService {
  constructor(
    @InjectRepository(Call) private readonly callRepository: Repository<Call>,
    @Inject(SERVICES.TWILIO_SERVICE)
    private readonly twilioService: ITwilioService,
  ) {}

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
