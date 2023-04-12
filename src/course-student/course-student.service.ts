import { Injectable } from '@nestjs/common';
import { CreateCourseStudentDto } from './dto/create-course-student.dto';
import { UpdateCourseStudentDto } from './dto/update-course-student.dto';

@Injectable()
export class CourseStudentService {
  create(createCourseStudentDto: CreateCourseStudentDto) {
    return 'This action adds a new courseStudent';
  }

  findAll() {
    return `This action returns all courseStudent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseStudent`;
  }

  update(id: number, updateCourseStudentDto: UpdateCourseStudentDto) {
    return `This action updates a #${id} courseStudent`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseStudent`;
  }
}
