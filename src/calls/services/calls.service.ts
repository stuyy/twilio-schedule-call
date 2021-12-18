import { Injectable } from '@nestjs/common';
import { ICallsService } from '../interfaces/CallsService';

@Injectable()
export class CallsService implements ICallsService {
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
