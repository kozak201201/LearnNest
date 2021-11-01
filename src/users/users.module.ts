import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { UserRolesModel } from '../roles/user-roles.model';
import { KozakJwtModule } from '../kozak-jwt/kozak-jwt.module';
import { PostsModule } from '../posts/posts.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    KozakJwtModule,
    RolesModule,
    SequelizeModule.forFeature([User, UserRolesModel]),
    forwardRef(() => PostsModule),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
