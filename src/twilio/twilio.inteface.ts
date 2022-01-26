// import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';
import { CallInstance } from 'twilio/lib/rest/api/v2010/account/call';
import { VerificationCheckInstance } from 'twilio/lib/rest/verify/v2/service/verificationCheck';
import { Call } from '../typeorm/entities/Call';
import { CreateSMSDetails } from '../utils/types';

export interface ITwilioService {
  startCall(call: Call): Promise<CallInstance>;
  createVerifyService(to: string);
  verifyCode(to: string, code: string): Promise<VerificationCheckInstance>;
  sendSMS(smsDetails: CreateSMSDetails);
  // getVoiceResponse(): VoiceResponse;
}
