import { ScheduleCallDto } from '../dto/ScheduleCallDto';

export interface ICallsService {
  scheduleCall(scheduleCallDto: ScheduleCallDto);
  getCall();
  updateCall();
  cancelCall();
}
