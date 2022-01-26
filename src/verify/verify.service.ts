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
    if (user.emailVerified)
      throw new HttpException(
        'Email address already verified',
        HttpStatus.BAD_REQUEST,
      );
    console.log(user);
    const jwtToken = this.tokenService.generateJwt(user);
    await this.sendgridService.sendVerificationEmail(user, jwtToken);
  }

  async verifyEmailToken(userId: number, token: string) {
    const userDB = await this.userService.findUser({ id: userId });
    if (!userDB)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    if (userDB.emailVerified)
      throw new HttpException(
        'Email address already verified',
        HttpStatus.BAD_REQUEST,
      );
    const verifiedUser = this.tokenService.verifyJwt(token);
    if (verifiedUser.id !== userId)
      throw new HttpException('Invalid JWT', HttpStatus.BAD_REQUEST);
    return this.userService.updateUser(verifiedUser.id, {
      emailVerified: true,
    });
  }
}
