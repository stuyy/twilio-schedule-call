import { CreateSMSDetails } from '../utils/types';

export interface ISMSMessengerService {
  sendSMS(smsDetaills: CreateSMSDetails);
}
