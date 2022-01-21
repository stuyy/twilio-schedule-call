// import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';
import { VerificationCheckInstance } from 'twilio/lib/rest/verify/v2/service/verificationCheck';
import { Call } from '../typeorm/entities/Call';
import { VerifyCodeResponse } from '../utils/types';

export interface ITwilioService {
  startCall(call: Call);
  createVerifyService(to: string);
  verifyCode(to: string, code: string): Promise<VerificationCheckInstance>;
  // getVoiceResponse(): VoiceResponse;
}
