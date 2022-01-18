// import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';
import { Call } from '../typeorm/entities/Call';

export interface ITwilioService {
  startCall(call: Call);
  // getVoiceResponse(): VoiceResponse;
}
