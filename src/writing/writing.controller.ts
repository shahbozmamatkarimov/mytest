import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { WritingService } from './writing.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { WritingDto } from './dto/writing.dto';

@ApiTags('Writing')
@Controller('writing')
export class WritingController {
  constructor(private readonly writingService: WritingService) {}

  @ApiOperation({ summary: 'Create a new writing' })
  @Post()
  createWriting(@Body() writingDto: WritingDto[]) {
    return this.writingService.createWriting(writingDto);
  }

  @ApiOperation({ summary: 'Update writing by id' })
  @UseGuards(AuthGuard)
  @Put('/:id')
  update(@Param('id') id: number, @Body() writingDto: WritingDto) {
    return this.writingService.update(id, writingDto);
  }

  @ApiOperation({ summary: 'Get all writing' })
  @Get('/getAll')
  getAll() {
    return this.writingService.getAll();
  }

  @ApiOperation({ summary: 'Delete writing by id' })
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.writingService.delete(id);
  }
}

[
  {
    "task_number": 1,
    "word_limit": 250,
    "time_limit": 50,
    "task_description": 'lorem lorem lorem',
    "task_title": 'lorem loream loream',
    "in_task": ['savol 1', 'savol 2', 'savol 3', 'savol 4']
  }
]
