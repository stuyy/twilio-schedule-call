import { IsPhoneNumber } from 'class-validator';

export class MobilePhoneDto {
  @IsPhoneNumber('US')
  mobile: string;
}
