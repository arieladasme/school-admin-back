import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { RegisterUserDto } from './dto/register-user.dto'
import { User } from './entities/user.entity'
import { LoginUserDto } from './dto'
import { JwtPayload } from './interfaces'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(registerUserDto: RegisterUserDto) {
    try {
      const { password, ...userData } = registerUserDto

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      })

      await this.userRepository.save(user)
      delete user.password

      return { ...user, token: this.getJwtToken({ id: user.id }) }
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto

    const user = await this.userRepository.findOne({
      where: { email },
    })

    if (!user || !bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid')

    delete user.password
    return { ...user, token: this.getJwtToken({ id: user.id }) }
  }

  async refreshToken(token: string) {
    try {
      const { sub, roles } = await this.jwtService.verify(token)

      const payload = { sub, roles }
      return this.jwtService.sign(payload)
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error,
        },
        HttpStatus.FORBIDDEN,
      )
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload)
    return token
  }

  async checkAuthStatus(user: User) {
    return { ...user, token: this.getJwtToken({ id: user.id }) }
  }

  private handleDBErrors(error: any) {
    if (error.code === '23505')
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: error.detail },
        HttpStatus.BAD_REQUEST,
      )

    throw new HttpException(
      { status: HttpStatus.INTERNAL_SERVER_ERROR, error: 'Please check server logs' },
      HttpStatus.INTERNAL_SERVER_ERROR,
    )
  }
}
