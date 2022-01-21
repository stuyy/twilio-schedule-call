import { IsDateString, IsNotEmpty, IsNumberString } from 'class-validator';

export class ScheduleCallDto {
  @IsNumberString()
  caller: string;

  @IsNumberString()
  recipient: string;

  @IsNotEmpty()
  description: string;

  @IsDateString()
  scheduledDate: string;
}
