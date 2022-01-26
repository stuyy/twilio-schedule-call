import { Inject, Injectable } from '@nestjs/common';
import { User } from '../typeorm/entities/User';
import { SERVICES } from '../utils/constants';
import { SendGridClient } from './sendgrid';
import { EmailService } from './sendgrid.interface';

@Injectable()
export class SendgridService implements EmailService {
  constructor(
    @Inject(SERVICES.SENDGRID_CLIENT)
    private readonly sendgridClient: SendGridClient,
  ) {}

  sendVerificationEmail(user: User, token: string) {
    const emailVerifyURL = `${process.env.EMAIL_VERIFY_URL}/${token}`;
    return this.sendgridClient
      .send({
        to: user.email,
        from: process.env.EMAIL_SENDER_DOMAIN,
        subject: 'Verify your Email Address',
        html: `<p>Hey ${user.firstName} ${user.lastName}! We're sending you a link you can use to verify your email address. Click <a href="${emailVerifyURL}">here</a> to verify your email.</p>`,
      })
      .then((v) => console.log(v))
      .catch((err) => console.log(err.response));
  }
}
