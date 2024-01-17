import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class TextDto {
  @ApiProperty({
    example: 'Hello world!',
    description: 'Audio text',
  })
  @IsNotEmpty()
  @IsString()
  text: string;
}
