import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserRoleGuard } from '../guards/user-role/user-role.guard'
import { validRoles } from '../interfaces'
import { RoleProtected } from './role-protected.decorator'

/**
 * El decorador Auth se utiliza para proteger un controlador o un endpoint en particular,
 * asegurándose de que solo los usuarios autenticados y con roles válidos puedan acceder a él.
 *
 * @param roles Lista de roles válidos que se deben cumplir para acceder al controlador o endpoint.
 * @returns Una función decoradora que se aplicará al controlador o endpoint.
 */
export function Auth(...roles: validRoles[]) {
  return applyDecorators(RoleProtected(...roles), UseGuards(AuthGuard(), UserRoleGuard))
}
