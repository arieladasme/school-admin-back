import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from '../auth/entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

      return user
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  findAll() {
    return `This action returns all users`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
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
