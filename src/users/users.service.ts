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
   * Crea un nuevo usuario en la base de datos
   * @param createUserDto - Datos necesarios para crear al usuario
   * @returns El usuario creado
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { rut } = createUserDto

    try {
      // Obtener los primeros 4 caracteres del rut
      const rutSliced = rut.toString().slice(0, 4)
      const hashedPassword = await bcrypt.hash(rutSliced, 10)

      // Crear un nuevo objeto usuario con los datos proporcionados
      const user = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      })

      // Guardar el usuario en la base de datos
      const savedUser = await this.userRepository.save(user)
      delete savedUser.password

      return savedUser
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  /**
   * Método asincrónico que busca todos los usuarios según los parámetros de paginación.
   * @param paginationDto Objeto que contiene los parámetros de paginación (opcional)
   * @returns Una promesa que se resuelve con un arreglo de objetos de tipo User
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
      take: limit, // Número máximo de registros a devolver
      skip: offset, // Número de registros a saltar antes de devolver los resultados
      //relations: { xxx: true }, // Incluir relaciones específicas
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
