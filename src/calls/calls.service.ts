import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITwilioService } from '../twilio/twilio.inteface';
import { Call } from '../typeorm/entities/Call';
import { SERVICES } from '../utils/constants';
import { ScheduleCallDto } from './call.dto';
import { ICallsService } from './calls.interface';

@Injectable()
export class CallsService implements ICallsService {
  constructor(
    @InjectRepository(Call) private readonly callRepository: Repository<Call>,
    @Inject(SERVICES.TWILIO_SERVICE)
    private readonly twilioService: ITwilioService,
  ) {}

  scheduleCall(scheduleCallDto: ScheduleCallDto) {
    const call = this.callRepository.create(scheduleCallDto);
    return this.callRepository.save(call);
  }
  getCall() {
    throw new Error('Method not implemented.');
  }
  updateCall() {
    throw new Error('Method not implemented.');
  }
  cancelCall() {
    throw new Error('Method not implemented.');
  }
  startCall(call: Call) {
    this.twilioService.startCall(call);
  }
}
