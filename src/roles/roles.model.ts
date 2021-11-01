import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { UserRolesModel } from './user-roles.model';
import { CreateRoleDto } from './dto/create-role.dto';

@Table({ tableName: 'roles', createdAt: false, updatedAt: false })
export class Role extends Model<Role, CreateRoleDto> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @BelongsToMany(() => User, () => UserRolesModel)
  users: User[];
}
