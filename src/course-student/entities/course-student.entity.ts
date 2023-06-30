import { Course } from 'src/courses/entities/course.entity'
import { User } from 'src/auth/entities/user.entity'
import { Entity, Column, ManyToOne } from 'typeorm'

@Entity('course-student')
export class CourseStudent {
  @Column()
  courseId: string

  @Column()
  alumnId: string

  /* @ManyToOne(type => Course, course => course)
  course: Course; */

  @ManyToOne((type) => User, (user) => user.role)
  student: User
}
