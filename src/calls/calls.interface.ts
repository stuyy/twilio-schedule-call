import { CallInstance } from 'twilio/lib/rest/api/v2010/account/call';
import { Call } from '../typeorm/entities/Call';
import { ScheduleCallDto } from './calls.dto';

export interface ICallsService {
  scheduleCall(scheduleCallDto: ScheduleCallDto): Promise<Call>;
  startCall(call: Call): Promise<CallInstance>;
  getCall();
  updateCall();
  cancelCall();
}
