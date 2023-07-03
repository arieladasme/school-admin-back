import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CoursesService } from './courses.service'
import { CoursesController } from './courses.controller'
import { Course } from './entities/course.entity'

@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
  imports: [TypeOrmModule.forFeature([Course])],
  exports: [TypeOrmModule],
})
export class CoursesModule {}
