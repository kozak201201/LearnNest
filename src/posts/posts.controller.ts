import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Roles } from '../roles/roles-auth.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { ValidationPipe } from '../pipes/validation-pipe.service';
import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Roles('ADMIN')
@UseGuards(AuthGuard, RolesGuard)
@UsePipes(ValidationPipe)
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(
    @UploadedFile() image: Express.Multer.File,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.create(image, createPostDto);
  }
}
