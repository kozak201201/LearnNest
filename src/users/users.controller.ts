import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { Roles } from '../roles/roles-auth.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { ValidationPipe } from '../pipes/validation-pipe.service';
import { AuthGuard } from '../auth/auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { UserJwtDto } from '../kozak-jwt/dto/user-jwt.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/:id')
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getOne(id);
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @UsePipes(ValidationPipe)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @Get('/posts')
  getPosts(@GetUser() user: UserJwtDto) {
    return this.usersService.getPosts(user.id);
  }
}
