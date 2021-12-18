import { Call } from '../../typeorm/entities/Call';
import { ScheduleCallDto } from '../dto/ScheduleCallDto';

export interface ICallsService {
  scheduleCall(scheduleCallDto: ScheduleCallDto): Promise<Call>;
  getCall();
  updateCall();
  cancelCall();
}
