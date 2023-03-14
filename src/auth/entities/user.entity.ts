import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text', { unique: true })
  email: string

  @Column('text', { select: false })
  password: string

  @Column('text')
  name: string

  @Column('text')
  lastName: string

  @Column('bool', { default: true })
  isActive: boolean

  @Column('text', { array: true, default: ['user'] })
  roles: string[]

  @Column('date', { default: new Date() })
  createdAt: string

  @Column('date', { nullable: true })
  updatedAt: string

  @BeforeInsert()
  @BeforeUpdate()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim()
  }
}
