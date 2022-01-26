import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { CronJob } from 'cron';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Call } from '../typeorm/entities/Call';
import { ISchedulerService } from './scheduler.interface';

@Injectable()
export class SchedulerService implements ISchedulerService {
  constructor(
    private scheduler: SchedulerRegistry,
    @InjectRepository(Call) private readonly callRepository: Repository<Call>,
  ) {}

  scheduleCronJob(jobId: string, job: CronJob) {
    this.scheduler.addCronJob(jobId, job);
    job.start();
    console.log(`Job #${jobId} started.`);
  }

  cancelCrobJob(jobId: string) {
    console.log(`Deleting Cron Job #${jobId}`);
    this.scheduler.deleteCronJob(jobId);
  }

  getCronJob(id: string) {
    throw new Error('Method not implemented.');
  }

  getCronJobs() {
    return this.scheduler.getCronJobs();
  }

  async getCronJobsByUser(id: number) {
    const calls = await this.getUserCalls(id);
    const scheduledCalls = this.getCronJobs();
    return calls.filter((call) => scheduledCalls.get(call.id.toString()));
  }

  private getUserCalls(id: number) {
    return this.callRepository.find({
      where: {
        user: {
          id,
        },
        scheduledDate: MoreThanOrEqual(new Date()),
      },
    });
  }
}
