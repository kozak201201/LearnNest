import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { KozakJwtService } from '../kozak-jwt/kozak-jwt.service';
import { UserJwtDto } from '../kozak-jwt/dto/user-jwt.dto';

@Injectable()
export class AuthService {
  private saltOrRounds = 5;

  constructor(
    private usersService: UsersService,
    private kozakJwtService: KozakJwtService,
  ) {}

  async login(loginDto: CreateUserDto) {
    const user = (await this.usersService.getByEmail(loginDto.email)).get();

    if (!user) {
      throw new HttpException(`This user doesn't exist`, HttpStatus.NOT_FOUND);
    }

    const isValidPassword = bcrypt.compareSync(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new HttpException(`Invalid password`, HttpStatus.BAD_REQUEST);
    }

    delete user.password;

    const accessToken = this.kozakJwtService.generateJwtAccessToken(user);
    const refreshToken = this.kozakJwtService.generateJwtRefreshToken(user);

    await this.kozakJwtService.saveRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async registration(createUserDto: CreateUserDto) {
    const candidat = await this.usersService.getByEmail(createUserDto.email);

    if (candidat) {
      throw new HttpException(`This user was found`, HttpStatus.BAD_REQUEST);
    }

    const hashPassword = bcrypt.hashSync(
      createUserDto.password,
      this.saltOrRounds,
    );

    const user = (
      await this.usersService.create({
        ...createUserDto,
        password: hashPassword,
      })
    ).get();
    delete user.password;

    const accessToken = this.kozakJwtService.generateJwtAccessToken(user);
    const refreshToken = this.kozakJwtService.generateJwtRefreshToken(user);

    await this.kozakJwtService.saveRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async refresh(user: UserJwtDto) {
    const accessToken = this.kozakJwtService.generateJwtAccessToken(user);
    const refreshToken = this.kozakJwtService.generateJwtRefreshToken(user);

    await this.kozakJwtService.saveRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }
}
