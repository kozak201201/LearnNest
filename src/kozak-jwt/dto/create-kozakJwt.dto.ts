import { IsString, IsUUID } from 'class-validator';

export class CreateKozakJwtDto {
  @IsUUID()
  readonly userId: string;
  @IsString({ message: 'refreshToken must be string' })
  readonly refreshToken: string;
}
