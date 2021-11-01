import { IsString, IsUUID } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'title must be string' })
  readonly title: string;
  @IsString({ message: 'description must be string' })
  readonly description: string;
  @IsUUID()
  readonly userId: string;
}
