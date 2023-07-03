import { User } from 'src/auth/entities/user.entity'
import { Subject } from '../../subjects/entities/subject.entity'
import { Entity, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'

@Entity('course')
export class Course {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User)
  teacher: User

  @ManyToOne(() => Subject)
  subject: Subject

  @ManyToMany(() => User)
  @JoinTable()
  students: User[]
}
