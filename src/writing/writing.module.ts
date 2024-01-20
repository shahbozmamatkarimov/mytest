import { Module } from '@nestjs/common';
import { WritingService } from './writing.service';
import { WritingController } from './writing.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Writing } from './models/writing.model';

@Module({
  imports: [SequelizeModule.forFeature([Writing])],
  controllers: [WritingController],
  providers: [WritingService],
  exports: [WritingService],
})
export class WritingModule {}
