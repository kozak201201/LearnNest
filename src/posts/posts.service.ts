import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { CreatePostDto } from './dto/create-post.dto';
import { UsersService } from '../users/users.service';
import { FileService } from '../file/file.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postsModel: typeof Post,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private fileService: FileService,
  ) {}

  async create(image: Express.Multer.File, createPostDto: CreatePostDto) {
    await this.usersService.getOne(createPostDto.userId);
    const imageName = this.fileService.createFile(image);
    return await this.postsModel.create({ ...createPostDto, image: imageName });
  }

  async getUserPosts(userId: string) {
    return await this.postsModel.findAll({ where: { userId } });
  }
}
