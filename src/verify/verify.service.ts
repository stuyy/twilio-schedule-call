import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TokenService } from '../jwt/jwt.service';
import { EmailService } from '../sendgrid/sendgrid.interface';
import { ITwilioService } from '../twilio/twilio.inteface';
import { User } from '../typeorm/entities/User';
import { IUserService } from '../user/user.interface';
import { SERVICES } from '../utils/constants';
import { VerifyPhoneParams } from '../utils/types';
import { IVerifyService } from './verify.interface';

@Injectable()
export class VerifyService implements IVerifyService {
  private tokens: Map<number, string> = new Map();
  constructor(
    @Inject(SERVICES.TWILIO_SERVICE)
    private readonly twilioService: ITwilioService,
    @Inject(SERVICES.USER)
    private readonly userService: IUserService,
    @Inject(SERVICES.SENDGRID_SERVICE)
    private readonly sendgridService: EmailService,
    @Inject(SERVICES.TOKEN_SERVICE) private readonly tokenService: TokenService,
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

  async verifyEmailAddress(user: User) {
    const existingToken = this.tokens.get(user.id);
    if (existingToken) {
      console.log(this.tokenService.verifyJwt(existingToken));
    } else {
      const jwtToken = this.tokenService.generateJwt(user);
      console.log(`JWT: ${jwtToken}`);
      this.tokens.set(user.id, jwtToken);
      await this.sendgridService.sendVerificationEmail(user, jwtToken);
    }
  }
  verifyEmailToken(token: string) {}
}
