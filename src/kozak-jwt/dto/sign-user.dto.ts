import { Role } from '../../roles/roles.model';
import { IsEmail, IsUUID } from 'class-validator';

export class SignUserDto {
  @IsUUID()
  readonly id: string;
  @IsEmail()
  readonly email: string;
  readonly roles: Role[];
}
