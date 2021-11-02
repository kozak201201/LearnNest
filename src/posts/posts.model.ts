import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { CreatePostDto } from './dto/create-post.dto';

interface PostCreationAttrs {
  title: string;
  description: string;
  image: string;
  userId: string;
}

@Table({ tableName: 'posts', updatedAt: false, createdAt: false })
export class Post extends Model<Post, PostCreationAttrs> {
  @Column({
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;
}
