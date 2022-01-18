import { Call } from '../typeorm/entities/Call';
import { ScheduleCallDto } from './call.dto';

export interface ICallsService {
  scheduleCall(scheduleCallDto: ScheduleCallDto): Promise<Call>;
  getCall();
  updateCall();
  cancelCall();
  startCall(call: Call);
}
