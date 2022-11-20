import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CreateUserDto } from 'src/dtos/create-user.dto'
import { UserDto } from 'src/dtos/user.dto'
import { Serialize } from 'src/interceptors/serialize.interceptor'
import { AuthenticationService } from './authentication.service'
import { UseAuthorizationGuard } from './authorization-guards/admin.guard'
import { Request } from 'express'
@Controller('auth')
export class AuthenticationController {
  constructor (
    private authenticationService: AuthenticationService,
  ) {}

  @Post('/register')
  @Serialize(UserDto)
  register (@Body() body: CreateUserDto) {
    return this.authenticationService.create(body)
  }

  @Post('/login')
  login (@Body() body: { email: string; password: string }) {
    return this.authenticationService.login(body)
  }
  @UseAuthorizationGuard('ADMIN')
  @UseGuards(AuthGuard('jwt'))
  @Get('/canAccess')
  access (@Req() req: Request) {
    //The request.user contains the authentication data and everything about the user
    // console.log(req.user)
    return 'hello admin'
  }
}
