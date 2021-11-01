import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { KozakJwtModule } from '../kozak-jwt/kozak-jwt.module';

@Module({
  imports: [UsersModule, KozakJwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
