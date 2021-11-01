import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private rolesModel: typeof Role) {}

  async create(createRoleDto: CreateRoleDto) {
    return await this.rolesModel.create(createRoleDto);
  }

  async getAll() {
    return await this.rolesModel.findAll();
  }

  async getByTitle(title: string) {
    const role = await this.rolesModel.findOne({ where: { title } });

    if (!role) {
      throw new HttpException(`Role not found`, HttpStatus.NOT_FOUND);
    }

    return role;
  }

  async getOne(id: string) {
    const role = await this.rolesModel.findOne({ where: { id } });

    if (!role) {
      throw new HttpException(`Role not found`, HttpStatus.NOT_FOUND);
    }

    return role;
  }
}
