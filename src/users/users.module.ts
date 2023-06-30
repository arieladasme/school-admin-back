import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User } from '../auth/entities/user.entity'

@Module({
  controllers: [UsersController], // Controladores utilizados en este módulo
  providers: [UsersService], // Servicios utilizados en este módulo
  imports: [TypeOrmModule.forFeature([User])], // Importación del módulo TypeOrm y definición de la entidad User
})
export class UsersModule {}
