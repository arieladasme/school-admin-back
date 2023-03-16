import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto'
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

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto

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
      throw new BadRequestException(error)
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload)
    return token
  }

  async checkAuthStatus(user: User) {
    return { ...user, token: this.getJwtToken({ id: user.id }) }
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail)

    console.log(error)

    throw new InternalServerErrorException('Please check server logs')
  }
}
