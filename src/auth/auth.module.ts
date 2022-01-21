import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { SERVICES } from '../utils/constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: SERVICES.AUTH,
      useClass: AuthService,
    },
  ],
  imports: [UserModule],
})
export class AuthModule {}
