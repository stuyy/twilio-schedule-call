import { MailService } from '@sendgrid/mail';

export class SendGridClient extends MailService {
  constructor(apiKey: string) {
    super();
    super.setApiKey(apiKey);
  }
}
