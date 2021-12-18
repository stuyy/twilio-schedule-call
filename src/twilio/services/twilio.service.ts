import { Injectable } from '@nestjs/common';
import { ITwilioService } from '../interfaces/twilio';

@Injectable()
export class TwilioService implements ITwilioService {
  startCall() {}
}
