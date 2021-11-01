import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserJwtDto } from '../kozak-jwt/dto/user-jwt.dto';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: UserJwtDto = request.user;
    return user;
  },
);
