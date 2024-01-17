import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { Response } from 'express';
import { generateToken, writeToCookie } from 'src/utils/token';
import { Student } from './models/student.model';
import { StudentDto } from './dto/create.dto';
import { UuidService } from '../generate_url/uuid.service';
import { Part1Service } from '../part1/part1.service';
import { Part2Service } from '../part2/part2.service';
import { BotService } from '../bot/bot.service';
import { FilesService } from '../files/files.service';
import axios from 'axios';
import { TextDto } from './dto/text.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student) private studentRepository: typeof Student,
    private readonly jwtService: JwtService,
    private readonly uuidService: UuidService,
    private readonly part1Service: Part1Service,
    private readonly part2Service: Part2Service,
    private readonly botService: BotService,
    private readonly fileService: FilesService,
  ) {}

  async uploadAnswer(studentDto: StudentDto, audio: any) {
    try {
      console.log(audio);

      if (!studentDto.full_name) {
        throw new NotFoundException('Please enter your full name!');
      }

      if (!studentDto.part1 || !studentDto.part2) {
        throw new NotFoundException('Please send test ids!');
      }

      if (!audio) {
        throw new NotFoundException('Audio not found!');
      }

      const part1 = await this.part1Service.getById(+studentDto.part1);
      const part2 = await this.part2Service.getById(+studentDto.part2);

      // const file_name:string = await this.fileService.createFile(audio, full_name);
      this.botService.sendAudio(audio, studentDto.full_name, part1, part2);

      return {
        status: HttpStatus.OK,
        data: 'Your answer was sent successfully!',
      };
    } catch (error) {
      return { status: HttpStatus.BAD_REQUEST, error: error.message };
    }
  }

  async getAll(page: number, limit: number): Promise<object> {
    try {
      const offset = (page - 1) * limit;
      const students = await this.studentRepository.findAll({
        order: [['createdAt', 'DESC']],
        offset,
        limit,
      });
      const total_count = await this.studentRepository.count();
      const total_pages = Math.ceil(total_count / limit);
      const response = {
        statusCode: HttpStatus.OK,
        data: {
          records: students,
          pagination: {
            currentPage: Number(page),
            total_pages,
            total_count,
          },
        },
      };
      return response;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async get_test(uuid: string): Promise<object> {
    try {
      const id = await this.uuidService.getById(uuid);
      if (id != uuid) {
        throw new NotFoundException('This url is not found!');
      }

      const parts: any[] = [];
      const part1: any = await this.part1Service.getAll();
      const part2: any = await this.part2Service.getAll();
      parts.push(part1, part2);

      let l: number;
      let randomNumber: number;
      // let _tests: any = [];
      let tests: any = [];
      for (let i of parts) {
        if (!i.data?.part?.length) {
          return {
            statusCode: HttpStatus.OK,
            message: 'Questions not found',
            data: {},
          };
        }
        l = i.data?.part?.length;
        randomNumber = Math.floor(Math.random() * l);
        tests.push(i.data?.part[randomNumber]);
      }

      const part = [];

      // for (let i of  tests[0]?.part1) {
      //   const data = await axios.post('https://streamlabs.com/polly/speak', {
      //     voice: 'Joey',
      //     // voice: 'Joanna',
      //     text: i,
      //   });

      //   const buffer = await axios.get(data.data.speak_url)
      //   console.log(buffer);
      //   if (data.status == 200) {
      //     part.push(data.data.speak_url);
      //   }
      // }

      // tests.part1 = Object.assign({}, _tests[0].dataValues, { _part1: part });

      // for (let i of _tests[1]?.part2) {
      //   const data = await axios.post('https://streamlabs.com/polly/speak', {
      //     voice: 'Joey',
      //     // voice: 'Joanna',
      //     text: i,
      //   });
      //   if (data.status == 200) {
      //     part.push(data.data.speak_url);
      //   }
      // }      
      // tests.part2 = Object.assign({}, _tests[1]?.dataValues, { _part2: part });

      // for (let i of _tests[1]?.part3[0]?.part3) {
      //   const data = await axios.post('https://streamlabs.com/polly/speak', {
      //     voice: 'Joey',
      //     // voice: 'Joanna',
      //     text: i,
      //   });
      //   if (data.status == 200) {
      //     part.push(data.data.speak_url);
      //   }
      // }

      // delete tests.part2?.part3;

    
      // tests.part3 = Object.assign({}, _tests[1]?.part3[0]?.dataValues, { _part3: part });

      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully',
        data: {
          tests,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async read_audio(textDto: TextDto): Promise<object> {
    try {
        let audio = await axios.post('https://streamlabs.com/polly/speak', {
          voice: 'Joey',
          // voice: 'Joanna',
          text: textDto.text,
        });
        if (audio.status == 200) {
          audio = audio.data.speak_url;
        }
        return {
          statusCode: HttpStatus.OK,
          message: 'Successfully',
          data: {
            audio,
          },
        };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: string): Promise<object> {
    try {
      const student = await this.studentRepository.findByPk(id);
      if (!student) {
        throw new NotFoundException('Student not found!');
      }
      student.destroy();
      return {
        statusCode: HttpStatus.OK,
        message: 'Deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
