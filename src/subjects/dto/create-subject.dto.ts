import { IsString, IsUppercase, MaxLength, MinLength } from 'class-validator'

export class CreateSubjectDto {
  @IsString()
  @IsUppercase()
  @MinLength(4)
  @MaxLength(4)
  code: string

  @IsString()
  name: string
}
