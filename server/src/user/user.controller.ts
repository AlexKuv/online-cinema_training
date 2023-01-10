import { Controller } from '@nestjs/common'
import { Get } from '@nestjs/common/decorators'

import { Auth } from 'src/auth/decorators/auth.decorator'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile() {
    return this.userService.byId()
  }
}
