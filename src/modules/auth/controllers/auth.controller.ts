import {
  UseGuards,
  Post,
  Request,
  Controller,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/localAuth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
