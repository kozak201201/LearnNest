import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Role } from './roles.model';

@Table({ tableName: 'usersRoles', createdAt: false, updatedAt: false })
export class UserRolesModel extends Model<UserRolesModel> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, unique: true })
  userId: string;

  @ForeignKey(() => Role)
  @Column({ type: DataType.UUID, unique: true })
  roleId: string;
}
