import { User } from '../typeorm/entities/User';
import { VerifyPhoneParams } from '../utils/types';

export interface IVerifyService {
  verifyPhoneNumber(params: VerifyPhoneParams);
  verifyEmailAddress(user: User);
  verifyEmailToken(token: string);
}
