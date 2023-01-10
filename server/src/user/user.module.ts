import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'

import { UserController } from './user.controller'
import { UserModel } from './user.model'
import { UserService } from './user.service'

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'User',
        },
      },
    ]),
  ],
})
export class UserModule {}
