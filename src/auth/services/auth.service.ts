import { Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    const isMach = await bcryptjs.compare(password, user.password);
    if (user && isMach) {
      return user;
    }
    return null;
  }
}
