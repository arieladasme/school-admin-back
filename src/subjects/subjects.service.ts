import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PaginationDto } from '../common/dtos/pagination.dto'
import { CreateSubjectDto } from './dto/create-subject.dto'
import { UpdateSubjectDto } from './dto/update-subject.dto'
import { Subject } from './entities/subject.entity'

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async create({ name, code }: CreateSubjectDto) {
    return await this.subjectRepository.save({ name, code })
  }

  async findAll(paginationDto: PaginationDto): Promise<Subject[]> {
    const { limit = 10, offset = 0 } = paginationDto
    return await this.subjectRepository.find({
      select: ['code', 'name'],
      take: limit, // Número máximo de registros a devolver
      skip: offset, // Número de registros a saltar antes de devolver los resultados
      //relations: { xxx: true }, // Incluir relaciones específicas
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} subject`
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`
  }

  remove(id: number) {
    return `This action removes a #${id} subject`
  }
}
