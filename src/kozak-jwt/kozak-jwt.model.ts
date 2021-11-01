import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { CreateKozakJwtDto } from './dto/create-kozakJwt.dto';

@Table({ tableName: 'refreshTokens', updatedAt: false, createdAt: false })
export class KozakJwtModel extends Model<KozakJwtModel, CreateKozakJwtDto> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, unique: true })
  userId: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  refreshToken: string;
}
