import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CallsModule } from './calls/calls.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './typeorm';
import { TwilioModule } from './twilio/twilio.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { VerifyModule } from './verify/verify.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { SendgridModule } from './sendgrid/sendgrid.module';
import { JwtServiceModule } from './jwt/jwt.module';

const envFilePath =
  process.env.ENVIRONMENT === 'DEVELOPMENT'
    ? '.env.development'
    : '.env.production';

console.log(
  `Environment: ${process.env.ENVIRONMENT}. Using ${envFilePath} path`,
);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST,
      port: parseInt(process.env.MYSQL_DB_PORT),
      username: process.env.MYSQL_DB_USERNAME,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_DATABASE,
      entities: entities,
      synchronize: true,
    }),
    JwtServiceModule,
    CallsModule,
    TwilioModule,
    AuthModule,
    UserModule,
    PassportModule.register({ session: true }),
    VerifyModule,
    SchedulerModule,
    SendgridModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
