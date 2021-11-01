import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { KozakJwtService } from './kozak-jwt.service';
import { KozakJwtModel } from './kozak-jwt.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([KozakJwtModel]),
    JwtModule.register({}),
  ],
  providers: [KozakJwtService],
  exports: [KozakJwtService],
})
export class KozakJwtModule {}
