import { Controller } from '@nestjs/common';
import { ROUTES } from '../utils/constants';

@Controller(ROUTES.USER)
export class UserController {}
