import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string

  //@ManyToOne(() => Subject)
  @Column('text')
  code: string

  //@ManyToOne(() => User)
  @Column('text')
  teacher: string

  /* @OneToMany(() => User, (user) => user.course, {
    cascade: true,
    eager: true,
  }) */
  @Column('text', { array: true, default: [] })
  students: string[]
}
