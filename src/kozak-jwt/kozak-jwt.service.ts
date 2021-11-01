import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { KozakJwtModel } from './kozak-jwt.model';
import { JwtService } from '@nestjs/jwt';
import { SignUserDto } from './dto/sign-user.dto';
import { UserJwtDto } from './dto/user-jwt.dto';

@Injectable()
export class KozakJwtService {
  constructor(
    @InjectModel(KozakJwtModel) private kozakJwtModel: typeof KozakJwtModel,
    private jwtService: JwtService,
  ) {}

  async saveRefreshToken(userId: string, refreshToken: string) {
    const refreshTokenFromDb = await this.kozakJwtModel.findOne({
      where: { userId },
    });

    if (!refreshTokenFromDb) {
      await this.kozakJwtModel.create({ userId, refreshToken });
    }

    await this.kozakJwtModel.update({ refreshToken }, { where: { userId } });
  }

  generateJwtAccessToken(user: SignUserDto) {
    return this.jwtService.sign(user, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET || 'accessSecret',
      expiresIn: '15m',
    });
  }

  generateJwtRefreshToken(user: SignUserDto) {
    return this.jwtService.sign(user, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET || 'refreshSecret',
      expiresIn: '24h',
    });
  }

  verifyAccessToken(accessToken: string): UserJwtDto {
    return this.jwtService.verify(accessToken, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET || 'accessSecret',
    });
  }

  async verifyRefreshToken(refreshToken: string): Promise<UserJwtDto> {
    const user = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET || 'refreshSecret',
    });

    const refreshTokenFromDb = await this.kozakJwtModel.findOne({
      where: { refreshToken },
    });

    if (!refreshTokenFromDb) {
      throw new UnauthorizedException({ message: 'No access' });
    }

    return user;
  }
}
