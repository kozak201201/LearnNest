import { forwardRef, Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { UsersModule } from '../users/users.module';
import { KozakJwtModule } from '../kozak-jwt/kozak-jwt.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    KozakJwtModule,
    SequelizeModule.forFeature([Post]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
