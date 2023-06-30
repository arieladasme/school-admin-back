import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PaginationDto } from '../common/dtos/pagination.dto'

// Controlador para la entidad 'users'
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Ruta para crear un nuevo usuario
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log('create')
    console.log(createUserDto)
    return this.usersService.create(createUserDto)
  }

  // Ruta para obtener todos los usuarios, opcionalmente con paginación
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto)
  }

  // Ruta para obtener un usuario por su id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  // Ruta para actualizar un usuario por su id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  // Ruta para eliminar un usuario por su id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
