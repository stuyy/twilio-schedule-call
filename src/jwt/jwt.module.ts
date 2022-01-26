import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SERVICES } from '../utils/constants';
import { TokenService } from './jwt.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'asdijaskdhaskdaksjdasdasdoascasopqdzqwpoaipxclcvjxcakzpwqnkzx',
    }),
  ],
  providers: [
    {
      provide: SERVICES.TOKEN_SERVICE,
      useClass: TokenService,
    },
  ],
  exports: [
    {
      provide: SERVICES.TOKEN_SERVICE,
      useClass: TokenService,
    },
  ],
})
export class JwtServiceModule {}
