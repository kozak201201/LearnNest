import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { UserRolesModel } from './user-roles.model';
import { KozakJwtModule } from '../kozak-jwt/kozak-jwt.module';

@Module({
  imports: [KozakJwtModule, SequelizeModule.forFeature([Role, UserRolesModel])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
