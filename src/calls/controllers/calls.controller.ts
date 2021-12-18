import { Controller, Get, Inject } from '@nestjs/common';
import { SERVICES } from '../../utils/constants';
import { ICallsService } from '../interfaces/CallsService';

@Controller('calls')
export class CallsController {
  constructor(
    @Inject(SERVICES.CALLS) private readonly callsService: ICallsService,
  ) {}

  @Get()
  getCall() {
    return this.callsService.getCall();
  }
}
