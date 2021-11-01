import { Role } from '../../roles/roles.model';
import { IsEmail, IsUUID } from 'class-validator';

export class UserJwtDto {
  @IsUUID()
  readonly id: string;
  @IsEmail()
  readonly email: string;
  readonly roles: Role[];
  iat: number;
  exp: number;
}
