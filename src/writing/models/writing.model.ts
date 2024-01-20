import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';

interface TimeStatus {
  count: number;
  count_type: string;
}

interface WritingAttributes {
  word_limit: number;
  time_limit: number;
  task_description: string;
  task_title: string;
  in_task: Array<string>;
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
  word_limit: number;
  
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  time_limit: number;
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  task_description: string;

  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  task_title: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  in_task: Array<string>;
}
