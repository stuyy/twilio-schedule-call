import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { CronJob } from 'cron';
import { Repository } from 'typeorm';
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

  getCronJob(id: string) {
    throw new Error('Method not implemented.');
  }
}
