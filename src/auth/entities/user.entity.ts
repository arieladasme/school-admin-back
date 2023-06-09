import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { validRoles } from '../interfaces'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text')
  name: string

  @Column('text')
  lastName: string

  @Column('text', { nullable: true })
  middleName: string

  @Column('text', { nullable: true })
  secondLastName: string

  @Column('text', { unique: true })
  email: string

  @Column('bool', { default: true })
  isActive: boolean

  @Column('text', { default: validRoles.student })
  role: string

  @Column('text', { nullable: true })
  photoURL: string

  @Column('date', { default: new Date() })
  createdAt: string

  @Column('date', { nullable: true })
  updatedAt: string

  @Column('text', { nullable: true })
  password: string

  @Column('int', { nullable: true, unique: true })
  rut: number

  @BeforeInsert()
  @BeforeUpdate()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim()
  }
}
