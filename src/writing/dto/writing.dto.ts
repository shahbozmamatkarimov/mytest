import { Writing } from '../models/writing.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

interface TestDto {
  task_number: number;
  word_limit: number;
  task_description: string;
  task_title: string;
  in_task: string[];
}

export class WritingDto {
  @ApiProperty({
    example: 1,
    description: 'Writing of time limit',
  })
  @IsNotEmpty()
  @IsNumber()
  time_limit: number;

  @ApiProperty({
    example: [
      {
        task_number: 1,
        word_limit: 250,
        task_description: 'lorem lorem lorem',
        task_title: 'lorem loream loream',
        in_task: ['savol 1', 'savol 2', 'savol 3', 'savol 4'],
      },
      {
        task_number: 2,
        word_limit: 250,
        task_description: 'lorem lorem lorem',
        task_title: 'lorem loream loream',
        in_task: ['savol 1', 'savol 2', 'savol 3', 'savol 4'],
      },
    ],
    description: 'Writing of tests',
  })
  @IsNotEmpty()
  @IsArray()
  tasks: Array<TestDto>;
}
 