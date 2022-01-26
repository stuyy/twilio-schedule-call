import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SERVICES } from '../utils/constants';
import { SendGridClient } from './sendgrid';
import { SendgridService } from './sendgrid.service';

const envFilePath =
  process.env.ENVIRONMENT === 'DEVELOPMENT'
    ? '.env.development'
    : '.env.production';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
    }),
  ],
  providers: [
    {
      provide: SERVICES.SENDGRID_CLIENT,
      useValue: new SendGridClient(process.env.SENDGRID_API_KEY),
    },
    {
      provide: SERVICES.SENDGRID_SERVICE,
      useClass: SendgridService,
    },
  ],
  exports: [
    {
      provide: SERVICES.SENDGRID_SERVICE,
      useValue: SendgridService,
    },
  ],
})
export class SendgridModule {}
