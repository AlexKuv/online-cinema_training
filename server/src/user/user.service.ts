import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { Types } from 'mongoose'
import { genSalt, hash } from 'bcryptjs'

import { UserModel } from './user.model'
import { updateUserDto } from './dto/updateUser.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
  ) {}

  async byId(id: string) {
    const user = await this.UserModel.findById(id)
    if (!user) throw new NotFoundException('User not found')

    return user
  }

  async updateProfile(_id: string, dto: updateUserDto) {
    const user = await this.byId(_id)
    const isSameUser = await this.UserModel.findOne({ email: dto.email })

    if (isSameUser && String(_id) !== String(isSameUser._id))
      throw new NotFoundException('Email busy')

    if (dto.password) {
      const salt = await genSalt(10)
      user.password = await hash(dto.password, salt)
    }

    user.email = dto.email
    if (dto.isAdmin || dto.isAdmin === false) user.isAdmin = dto.isAdmin

    await user.save()

    return
  }

  async getCount() {
    return this.UserModel.find().count().exec()
  }

  async getAll(searchTerm?: string) {
    let options = {}

    if (searchTerm) {
      options = {
        $or: [
          {
            email: new RegExp(searchTerm, 'i'),
          },
        ],
      }
    }

    return this.UserModel.find(options)
      .select('-password -updatedAt -__v')
      .sort({ createdAt: 'desc' })
  }

  async delete(id: string) {
    return this.UserModel.findByIdAndDelete(id).exec()
  }

  async toggleFavorite(movieId: Types.ObjectId, { _id, favorites }: UserModel) {
    await this.UserModel.findByIdAndUpdate(_id, {
      favorites: favorites.includes(movieId)
        ? favorites.filter((id) => String(id) !== String(movieId))
        : [...favorites, movieId],
    })
  }

  async getFavoriteMovies(_id: Types.ObjectId) {
    return (await this.UserModel.findById(_id, 'favorites'))
      .populate({
        path: 'favorites',
        populate: { path: 'genres' },
      })
      .then((data) => data.favorites)
  }
}
