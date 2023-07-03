import { IsArray, IsString } from 'class-validator'

export class CreateCourseDto {
  @IsString()
  code: string

  @IsString()
  teacher: string

  @IsString({ each: true })
  @IsArray()
  students: string[]
}
