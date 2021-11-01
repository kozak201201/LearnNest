import { IsUUID } from 'class-validator';

export class AddRoleDto {
  @IsUUID()
  readonly userId: string;
  @IsUUID()
  readonly roleId: string;
}
