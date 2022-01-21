import { Inject, Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { Call } from '../typeorm/entities/Call';
import { SERVICES } from '../utils/constants';
import { ITwilioService } from './twilio.inteface';

@Injectable()
export class TwilioService implements ITwilioService {
  constructor(
    @Inject(SERVICES.TWILIO_CLIENT) private readonly twilioClient: Twilio,
  ) {}
  startCall(call: Call) {
    this.twilioClient.calls
      .create({
        to: call.caller,
        from: process.env.TWILIO_PHONE_NUMBER,
        twiml: `
        <Response>
          <Pause length="2" />
          <Say>${call.description}</Say>
          <Gather action="https://ansonfoong.ngrok.io/api/calls/start-call?recipient=${call.recipient}" method="POST">
            <Say>Please enter 1 to call, or 2 to end.</Say>
          </Gather>
        </Response>`,
      })
      .then((v) => console.log(v))
      .catch((err) => console.log(err));
  }

  createVerifyService(to: string) {
    const channel = 'sms';
    return this.twilioClient.verify
      .services(process.env.TWILIO_SERVICE_SID)
      .verifications.create({ to, channel });
  }
}
