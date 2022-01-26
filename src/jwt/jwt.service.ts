import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenGenerator } from './jwt.interface';

@Injectable()
export class TokenService implements TokenGenerator {
  constructor(private readonly jwtService: JwtService) {}

  generateJwt(payload: string | object | Buffer) {
    return this.jwtService.sign(payload, { expiresIn: '30m' });
  }

  verifyJwt(token: string) {
    return this.jwtService.verify(token);
  }
}
