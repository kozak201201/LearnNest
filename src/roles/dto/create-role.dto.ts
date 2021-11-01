import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString({ message: 'title must be string' })
  readonly title: string;
  @IsString({ message: 'description must be string' })
  readonly description: string;
}
