import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

interface WritingAttributes {
  time_limit: number;
  tasks: object;
}

@Table({ tableName: 'writing' })
export class Writing extends Model<Writing, WritingAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  }) 
  time_limit: number;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  tasks: object;
}
