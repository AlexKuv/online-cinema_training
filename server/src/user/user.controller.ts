import { Controller, Delete, Query } from '@nestjs/common'
import { Get } from '@nestjs/common/decorators'
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator'
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator'
import { Put } from '@nestjs/common/decorators/http/request-mapping.decorator'
import {
  Body,
  Param,
} from '@nestjs/common/decorators/http/route-params.decorator'
import { ValidationPipe } from '@nestjs/common/pipes'

import { Auth } from 'src/auth/decorators/auth.decorator'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { User } from './decorators/user.decorator'
import { updateUserDto } from './dto/updateUser.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@User('_id') _id: string) {
    return this.userService.byId(_id)
  }

  @UsePipes(new ValidationPipe())
  @Put('profile')
  @HttpCode(200)
  @Auth()
  async updateProfile(@User('_id') _id: string, @Body() dto: updateUserDto) {
    return this.userService.updateProfile(_id, dto)
  }

  @Get('count')
  @Auth('admin')
  async getCountUsers() {
    return this.userService.getCount()
  }

  @Get()
  @Auth('admin')
  async getUsers(@Query('searchTerm') searchTerm?: string) {
    return this.userService.getAll(searchTerm)
  }

  @Get(':id')
  @Auth('admin')
  async getUser(@Param('id', IdValidationPipe) id: string) {
    return this.userService.byId(id)
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async updateUser(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: updateUserDto
  ) {
    return this.userService.updateProfile(id, dto)
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('admin')
  async deleteUser(@Param('id', IdValidationPipe) id: string) {
    return this.userService.delete(id)
  }
}
