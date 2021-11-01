import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { KozakJwtService } from '../kozak-jwt/kozak-jwt.service';
import { UserJwtDto } from '../kozak-jwt/dto/user-jwt.dto';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private kozakJwtService: KozakJwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const token = authHeader.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException({ message: `User didn't authorized` });
      }

      const user: UserJwtDto = this.kozakJwtService.verifyAccessToken(token);
      req.user = user;
      return true;
    } catch (err) {
      throw new HttpException('No access', HttpStatus.FORBIDDEN);
    }
  }
}
