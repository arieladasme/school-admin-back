import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginationDto } from 'src/common/dtos/pagination.dto'
import { Repository } from 'typeorm'
import { CreateCourseDto } from './dto/create-course.dto'
import { Course } from './entities/course.entity'

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async findAll(): Promise<Course[]> {
    //TODO: actualizar tablas para configurar relaciones
    const users = await this.courseRepository.find({
      select: ['teacher', 'code', 'students'],
      take: 10, // Número máximo de registros a devolver
      skip: 0, // Número de registros a saltar antes de devolver los resultados
      //relations: { xxx: true }, // Incluir relaciones específicas
    })
    return users
  }

  async create(createCourseDto: CreateCourseDto) {
    try {
      // Crear un nuevo objeto usuario con los datos proporcionados
      const course = this.courseRepository.create(createCourseDto)

      // Guardar el usuario en la base de datos
      const savedCourse = await this.courseRepository.save(course)

      return savedCourse
    } catch (error) {
      this.handleDBErrors(error)
    }
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
