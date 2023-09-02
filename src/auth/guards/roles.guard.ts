import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

import { PayloadToken } from '../models/token.model';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../models/roles.models';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!roles) return true;
    // ['admin', 'customer']
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    // {role: 'admin', sub: 1}
    const isAuth = roles.some((rol) => rol === user.role);
    if (!isAuth) throw new UnauthorizedException('You role is wrong.');

    return isAuth;
  }
}
