import { Injectable } from '@nestjs/common';
import { IAuthService } from './auth.interface';

@Injectable()
export class AuthService implements IAuthService {
  validateUser() {}
}
