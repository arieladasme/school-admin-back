import { IsEmail, IsInt, IsString, MaxLength, MinLength } from 'class-validator'

export class RegisterUserDto {
  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string

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

  //@Matches(/^\d{7,8}-[\dkK]$/, { message: 'The number must be an integer' })
  @IsInt({ message: 'The number must be an integer' })
  rut: number
}
