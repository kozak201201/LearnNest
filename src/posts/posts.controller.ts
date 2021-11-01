import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Roles } from '../roles/roles-auth.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { ValidationPipe } from '../pipes/validation-pipe.service';
import { AuthGuard } from '../auth/auth.guard';

@Roles('ADMIN')
@UseGuards(AuthGuard, RolesGuard)
@UsePipes(ValidationPipe)
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }
}
