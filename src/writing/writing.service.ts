import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Writing } from './models/writing.model';
import { WritingDto } from './dto/writing.dto';

@Injectable()
export class WritingService {
  constructor(
    @InjectModel(Writing) private writingRepository: typeof Writing,
  ) {}

  async create(writingDto: WritingDto): Promise<object> {
    try {
      const writing = await this.writingRepository.create(writingDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Created successfully',
        data: {
          writing,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, writingDto: WritingDto): Promise<object> {
    try {
      const writing = await this.writingRepository.findByPk(id);
      if (!writing) {
        throw new NotFoundException('Writing not found!');
      }
      const update = await this.writingRepository.update(writingDto, {
        where: { id },
        returning: true,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Updated successfully',
        data: {
          admin: update[1][0],
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAll(): Promise<object> {
    try {
      const writing = await this.writingRepository.findAll();

      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully',
        data: {
          writing,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getById(id: number): Promise<object> {
    try {
      const writing = await this.writingRepository.findByPk(id);
      if (!writing) {
        throw new NotFoundException('Writing not found!');
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully',
        data: {
          writing,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: number): Promise<object> {
    try {
      const writing = await this.writingRepository.findByPk(id);
      if (!writing) {
        throw new NotFoundException('Writing not found!');
      }
      writing.destroy();
      return {
        statusCode: HttpStatus.OK,
        message: 'Deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
