import { Controller, Post, Body, UsePipes } from '@nestjs/common'
import { HttpCode } from '@nestjs/common/decorators'
import { ValidationPipe } from '@nestjs/common/pipes'

import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { RefreshTokenDto } from './dto/refreshToken.dro'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto)
  }

  @UsePipes(new ValidationPipe())
  @Post('login/access-token')
  @HttpCode(200)
  async getNewTokens(@Body() dto: RefreshTokenDto) {
    return this.authService.getNewTokens(dto)
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  @HttpCode(200)
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto)
  }
}
