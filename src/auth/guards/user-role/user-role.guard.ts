import { Reflector } from '@nestjs/core'
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { User } from 'src/auth/entities/user.entity'
import { META_ROLES } from 'src/auth/decorators/role-protected.decorator'

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler())

    if (!validRoles) return true
    if (validRoles.length === 0) return true

    const req = context.switchToHttp().getRequest()
    const user = req.user as User

    // TODO:  DEPRECATED!
    if (!user)
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'User not found' },
        HttpStatus.NOT_FOUND,
      )

    for (const role of user.roles) {
      if (validRoles.includes(role)) return true
    }

    throw new ForbiddenException(`User ${user.name} need role [${validRoles}]`)

    return true
  }
}
