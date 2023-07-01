import { IsEmail, IsEnum, IsInt, IsString, MinLength } from 'class-validator'
import { validRoles } from 'src/auth/interfaces'

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @MinLength(1)
  name: string

  @IsString()
  @MinLength(1)
  lastName: string

  @IsString()
  @MinLength(1)
  middleName: string

  @IsString()
  @MinLength(1)
  secondLastName: string

  @IsEnum(validRoles, { each: true })
  role: validRoles

  //@Matches(/^\d{7,8}-[\dkK]$/, { message: 'The number must be an integer' })
  @IsInt({ message: 'The number must be an integer' })
  rut: number
}
