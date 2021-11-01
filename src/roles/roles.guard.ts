import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles-auth.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!roles.length) {
        return true;
      }

      const req = context.switchToHttp().getRequest();
      return req.user.roles.some((userRole) => roles.includes(userRole.title));
    } catch (err) {
      console.log(err);
      throw new HttpException(`No access`, HttpStatus.FORBIDDEN);
    }
  }
}
