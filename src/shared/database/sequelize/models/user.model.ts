import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  PrimaryKey,
  Table,
  UpdatedAt,
  Model,
  IsUUID,
  DeletedAt,
} from 'sequelize-typescript';
import { UserFunctionEnum } from 'src/modules/user/enum/user-function.enum';

@Table({
  modelName: 'user',
  timestamps: true,
  paranoid: false,
  freezeTableName: true,
})
export class UserModel extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Column({ type: DataType.UUIDV4, field: 'id', defaultValue: DataType.UUIDV4 })
  id: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING(100), field: 'name' })
  name: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING(200), field: 'password' })
  password: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING(200), field: 'email' })
  email: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(UserFunctionEnum.ADMIN, UserFunctionEnum.CLIENT),
    field: 'function',
  })
  function: UserFunctionEnum;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deleted_at: Date;
}
