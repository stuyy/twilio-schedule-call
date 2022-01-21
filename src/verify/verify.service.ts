import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ITwilioService } from '../twilio/twilio.inteface';
import { IUserService } from '../user/user.interface';
import { SERVICES } from '../utils/constants';
import { VerifyPhoneParams } from '../utils/types';
import { IVerifyPhoneService } from './verify.interface';

@Injectable()
export class VerifyPhoneService implements IVerifyPhoneService {
  constructor(
    @Inject(SERVICES.TWILIO_SERVICE)
    private readonly twilioService: ITwilioService,
    @Inject(SERVICES.USER)
    private readonly userService: IUserService,
  ) {}

  async verifyPhoneNumber(params: VerifyPhoneParams) {
    const { userId, mobile, code } = params;
    const verify = await this.twilioService.verifyCode(mobile, code);
    if (verify.status === 'approved') {
      return this.userService.updateUser(userId, { mobile, verified: true });
    } else {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
