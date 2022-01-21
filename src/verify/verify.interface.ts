import { VerifyPhoneParams } from '../utils/types';

export interface IVerifyPhoneService {
  verifyPhoneNumber(params: VerifyPhoneParams);
}
