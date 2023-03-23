import { Column, Entity } from 'typeorm'

@Entity('subjects')
export class Subject {
  @Column('text', { primary: true, unique: true })
  code: string

  @Column('text')
  name: string
}
