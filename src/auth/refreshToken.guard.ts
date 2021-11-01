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

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private kozakJwtService: KozakJwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const refreshToken = request.cookies.refreshToken;

      if (!refreshToken) {
        throw new UnauthorizedException({
          message: `Not found refreshToken in cookie`,
        });
      }

      const user: UserJwtDto = await this.kozakJwtService.verifyRefreshToken(
        refreshToken,
      );
      request.user = user;
      return true;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
