import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
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

  findAll() {
    return `This action returns all subjects`
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
