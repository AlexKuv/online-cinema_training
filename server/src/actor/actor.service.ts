import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'

import { ActorModel } from './actor.model'
import { ActorDto } from './dto/actor.dto'

@Injectable()
export class ActorService {
  constructor(
    @InjectModel(ActorModel) private readonly ActorModel: ModelType<ActorModel>
  ) {}

  async bySlug(slug: string) {
    const doc = await this.ActorModel.findOne({ slug }).exec()
    if (!doc) throw new NotFoundException('Actor is not found')

    return doc
  }

  async getAll(searchTerm?: string) {
    let options = {}

    if (searchTerm) {
      options = {
        $or: [
          {
            name: new RegExp(searchTerm, 'i'),
          },
          {
            slug: new RegExp(searchTerm, 'i'),
          },
        ],
      }
    }

    return this.ActorModel.find(options)
      .select('-updatedAt -__v')
      .sort({
        createdAt: 'desc',
      })
      .exec()
  }

  /* Admin place */

  async byId(_id: string) {
    const actor = await this.ActorModel.findById(_id)
    if (!actor) throw new NotFoundException('Actor is not found')

    return actor
  }

  async create() {
    const defaultValue: ActorDto = {
      name: '',
      slug: '',
      photo: '',
    }
    const actor = await this.ActorModel.create(defaultValue)

    return actor._id
  }

  async update(id: string, dto: ActorDto) {
    const updateActor = await this.ActorModel.findByIdAndUpdate(id, dto, {
      new: true,
    }).exec()
    if (!updateActor) throw new NotFoundException('Actor is not found')

    return updateActor
  }

  async delete(id: string) {
    const removedActor = await this.ActorModel.findByIdAndDelete(id).exec()
    if (!removedActor) throw new NotFoundException('Actor is not found')

    return removedActor
  }
}
