import { Token } from './token.enam';
import { SetMetadata } from '@nestjs/common';

export const TOKEN_KEY = 'token';

export const SetToken = (token: Token = Token.Access) =>
  SetMetadata(TOKEN_KEY, token);
