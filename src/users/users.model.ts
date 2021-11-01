import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Post } from '../posts/posts.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '../roles/roles.model';
import { UserRolesModel } from '../roles/user-roles.model';

@Table({ tableName: 'users', updatedAt: false, createdAt: false })
export class User extends Model<User, CreateUserDto> {
  @Column({
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @HasMany(() => Post)
  posts: Post[];

  @BelongsToMany(() => Role, () => UserRolesModel)
  roles: Role[];
}
