import { Inject, Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { Call } from '../typeorm/entities/Call';
import { SERVICES } from '../utils/constants';
import { CreateSMSDetails } from '../utils/types';
import { ITwilioService } from './twilio.inteface';

@Injectable()
export class TwilioService implements ITwilioService {
  constructor(
    @Inject(SERVICES.TWILIO_CLIENT) private readonly twilioClient: Twilio,
  ) {}
  startCall(call: Call) {
    const callHandlerURL = process.env.CALL_HANDLER_URL;
    return this.twilioClient.calls.create({
      to: call.caller,
      from: process.env.TWILIO_PHONE_NUMBER,
      twiml: `
        <Response>
          <Pause length="2" />
          <Say>${call.description}</Say>
          <Gather action="${callHandlerURL}?recipient=${call.recipient}" method="POST">
            <Say>Please enter 1 to call, or 2 to end.</Say>
          </Gather>
        </Response>`,
    });
  }

  createVerifyService(to: string) {
    const channel = 'sms';
    return this.twilioClient.verify
      .services(process.env.TWILIO_SERVICE_SID)
      .verifications.create({ to, channel });
  }

  verifyCode(to: string, code: string) {
    return this.twilioClient.verify
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({ to, code });
  }

  sendSMS(smsDetails: CreateSMSDetails) {
    const { to, from, body } = smsDetails;
    return this.twilioClient.messages.create({ to, from, body });
  }
}
