import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { Auth, GetUser } from './decorators'
import { LoginUserDto } from './dto'
import { RegisterUserDto } from './dto/register-user.dto'
import { User } from './entities/user.entity'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.create(registerUserDto)
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }

  @Get('refresh-token')
  async refreshToken(@Req() request: any) {
    return this.authService.refreshToken(request.headers.authtoken)
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user)
  }

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(+id, updateUserDto)
  } */

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRout() {
    return 'yes'
  }
}
