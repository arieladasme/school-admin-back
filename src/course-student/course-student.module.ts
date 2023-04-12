import { Module } from '@nestjs/common';
import { CourseStudentService } from './course-student.service';
import { CourseStudentController } from './course-student.controller';

@Module({
  controllers: [CourseStudentController],
  providers: [CourseStudentService]
})
export class CourseStudentModule {}
