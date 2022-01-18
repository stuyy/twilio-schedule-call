import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CallsModule } from './calls/calls.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './typeorm';
import { TwilioModule } from './twilio/twilio.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
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
    CallsModule,
    TwilioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
