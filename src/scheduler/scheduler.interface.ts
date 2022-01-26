import { CronJob } from 'cron';

export interface ISchedulerService {
  scheduleCronJob(jobId: string, job: CronJob);
  getCronJob(id: string);
  getCronJobs(): Map<string, CronJob>;
  cancelCrobJob(id: string);
  getCronJobsByUser(id: number);
}
