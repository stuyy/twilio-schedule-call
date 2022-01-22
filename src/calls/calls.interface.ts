import { CallInstance } from 'twilio/lib/rest/api/v2010/account/call';
import { Call } from '../typeorm/entities/Call';
import { User } from '../typeorm/entities/User';
import { ScheduleCallDto } from './calls.dto';

export interface ICallsService {
  scheduleCall(user: User, scheduleCallDto: ScheduleCallDto): Promise<Call>;
  startCall(call: Call): Promise<CallInstance>;
  getCalls(userId: number): Promise<Call[]>;
  updateCall();
  cancelCall();
  jobScheduleCallback(call: Call);
}
