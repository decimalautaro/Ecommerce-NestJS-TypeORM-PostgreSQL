import {
  Controller,
  Post,
  UseGuards,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../services/auth.service';
import { CreateLoginDto } from '../dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginDto: CreateLoginDto) {
    const { email, password } = loginDto;
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return await this.authService.generateJWT(user);
  }
}
