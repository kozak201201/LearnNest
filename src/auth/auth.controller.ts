import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';
import { UserJwtDto } from '../kozak-jwt/dto/user-jwt.dto';
import { Token } from '../kozak-jwt/token.enam';
import { Response } from 'express';
import { RefreshTokenGuard } from './refreshToken.guard';
import { ValidationPipe } from '../pipes/validation-pipe.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('/login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginUserDto: CreateUserDto,
  ) {
    const tokensObj = await this.authService.login(loginUserDto);
    response.cookie(Token.Refresh, tokensObj.refreshToken);
    return tokensObj;
  }

  @UsePipes(ValidationPipe)
  @Post('/registration')
  async registration(
    @Res({ passthrough: true }) response: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    const tokensObj = await this.authService.registration(createUserDto);
    response.cookie(Token.Refresh, tokensObj.refreshToken);
    return tokensObj;
  }

  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  async refresh(
    @Res({ passthrough: true }) response: Response,
    @GetUser() user: UserJwtDto,
  ) {
    delete user.exp;
    delete user.iat;

    const tokensObj = await this.authService.refresh(user);
    response.cookie(Token.Refresh, tokensObj.refreshToken);

    return tokensObj;
  }

  @Get('/logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(Token.Refresh);
  }
}
