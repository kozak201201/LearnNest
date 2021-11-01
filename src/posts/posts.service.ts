import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { CreatePostDto } from './dto/create-post.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postsModel: typeof Post,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    await this.usersService.getOne(createPostDto.userId);
    return await this.postsModel.create(createPostDto);
  }

  async getUserPosts(userId: string) {
    return await this.postsModel.findAll({ where: { userId } });
  }
}
