import { Writing } from './../models/writing.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class WritingDto {
  @ApiProperty({
    example: 250,
    description: 'Writing of word limit',
  })
  @IsNotEmpty()
  @IsNumber()
  word_limit: number;

  @ApiProperty({
    example: 50,
    description: 'Writing of time limit',
  })
  @IsNotEmpty()
  @IsNumber()
  time_limit: number;

  @ApiProperty({
    example: "Deforestation",
    description: 'Writing of description',
  })
  @IsNotEmpty()
  @IsNumber()
  task_description: string;

  @ApiProperty({
    example: "Deforestation",
    description: 'Writing of title',
  })
  @IsNotEmpty()
  @IsNumber()
  task_title: string;

  @ApiProperty({
    example: [
      "Speak about you",
      "What is your favorite hobbies?",
      "What is your name?",
    ],
    description: 'Writing of tasks',
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  in_task: string[];}
