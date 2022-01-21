import { IsNotEmpty, IsNumberString } from 'class-validator';

export class VerifyPhoneDto {
  @IsNumberString()
  @IsNotEmpty()
  mobile: string;

  @IsNumberString()
  @IsNotEmpty()
  code: string;
}
