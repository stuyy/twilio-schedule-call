import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Call } from '../../typeorm/entities/Call';
import { ICallsService } from '../interfaces/CallsService';

@Injectable()
export class CallsService implements ICallsService {
  constructor(
    @InjectRepository(Call) private readonly callRepository: Repository<Call>,
  ) {}

  scheduleCall() {
    throw new Error('Method not implemented.');
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
}
