import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { PaginationDto } from '../common/dtos/pagination.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from '../auth/entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ password, ...userData }: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10)

      const user = await this.userRepository.save(
        this.userRepository.create({
          ...userData,
          password: hashedPassword,
        }),
      )

      delete user.password

      return user
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto
    const users = await this.userRepository.find({
      select: [
        'id',
        'name',
        'middleName',
        'lastName',
        'secondLastName',
        'rut',
        'email',
        'isActive',
        'roles',
      ],
      take: limit,
      skip: offset,
      //relations: { xxx: true },
    })
    console.log('users')
    return users
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
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: error.code === '23505' ? error.detail : 'Please check server logs',
      },
      HttpStatus.BAD_REQUEST,
    )
  }
}
