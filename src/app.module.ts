import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostsModule } from './posts/posts.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { KozakJwtModule } from './kozak-jwt/kozak-jwt.module';
import { FileService } from './file/file.service';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
    }),
    UsersModule,
    PostsModule,
    RolesModule,
    AuthModule,
    KozakJwtModule,
    FileModule,
  ],
  controllers: [],
  providers: [FileService],
})
export class AppModule {}
