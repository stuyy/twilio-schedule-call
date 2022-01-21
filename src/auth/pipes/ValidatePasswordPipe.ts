import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/CreateUser.dto';

@Injectable()
export class ValidatePasswordPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    if (value.password !== value.confirmPassword)
      throw new HttpException(
        'Passwords are not the same',
        HttpStatus.BAD_REQUEST,
      );
    return value;
  }
}
