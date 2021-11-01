import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/roles.model';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private usersModel: typeof User,
    private rolesService: RolesService,
    @Inject(forwardRef(() => PostsService)) private postsService: PostsService,
  ) {}

  async getAll() {
    return await this.usersModel.findAll({ include: { all: true } });
  }

  async getOne(id: string) {
    const user = await this.usersModel.findOne({
      where: { id },
      include: { all: true },
    });

    if (!user) {
      throw new HttpException(`User doesn't exist`, HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.usersModel.findOne({
      where: { email },
      include: Role,
    });

    return user;
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.getOne(addRoleDto.userId);
    const role = await this.rolesService.getOne(addRoleDto.roleId);

    await user.$set('roles', role.id);
  }

  async getPosts(userId: string) {
    return await this.postsService.getUserPosts(userId);
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersModel.create(createUserDto);
    const role = await this.rolesService.getByTitle('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }
}
