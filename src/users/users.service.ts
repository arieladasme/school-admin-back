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

  /**
   * Creates a new user with the provided data
   * @param {CreateUserDto} createUserDto - Data for creating a user
   * @returns {Promise<User>} - The created user
   */
  async create({ password, ...userData }: CreateUserDto): Promise<User> {
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

  /**
   * Finds all users with pagination
   * @param {PaginationDto} paginationDto - Parameters for pagination
   * @returns {Promise<User[]>} - Array of users
   */
  async findAll(paginationDto: PaginationDto): Promise<User[]> {
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
        'role',
      ],
      take: limit,
      skip: offset,
      //relations: { xxx: true },
    })
    return users
  }

  /**
   * Finds a user by id
   * @param {number} id - The id of the user to find
   * @returns {string} - A string with the user id
   */
  findOne(id: number): string {
    return `This action returns a #${id} user`
  }

  /**
   * Updates a user by id
   * @param {number} id - The id of the user to update
   * @param {UpdateUserDto} updateUserDto - Data for updating the user
   * @returns {string} - A string with the user id
   */
  update(id: number, updateUserDto: UpdateUserDto): string {
    return `This action updates a #${id} user`
  }

  /**
   * Removes a user by id
   * @param {number} id - The id of the user to remove
   * @returns {string} - A string with the user id
   */
  remove(id: number): string {
    return `This action removes a #${id} user`
  }

  /**
   * Handles database errors and throws an HttpException
   * @param {any} error - The error to handle
   */
  private handleDBErrors(error: any): void {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: error.code === '23505' ? error.detail : 'Please check server logs',
      },
      HttpStatus.BAD_REQUEST,
    )
  }
}
