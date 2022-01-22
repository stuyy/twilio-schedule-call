import { CronJob } from 'cron';
import { Call } from '../typeorm/entities/Call';

export interface ISchedulerService {
  scheduleCronJob(jobId: string, job: CronJob);
  getCronJob(id: string);
}
