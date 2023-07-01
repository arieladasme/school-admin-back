import { PartialType } from '@nestjs/mapped-types'
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  id: string

  @IsBoolean()
  isActive: boolean

  @IsString()
  @IsOptional()
  photoURL?: string

  @IsDate()
  @IsOptional()
  createdAt?: Date

  @IsDate()
  @IsOptional()
  updatedAt?: Date
}
