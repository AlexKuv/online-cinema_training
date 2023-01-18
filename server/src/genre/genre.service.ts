import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'

import { GenreModel } from './genre.model'
import { CreateGenreDto } from './dto/createGenre.dto'

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(GenreModel) private readonly GenreModel: ModelType<GenreModel>
  ) {}

  async bySlug(slug: string) {
    return this.GenreModel.findOne({ slug }).exec()
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
          {
            description: new RegExp(searchTerm, 'i'),
          },
        ],
      }
    }

    return this.GenreModel.find(options)
      .select('-updateAt -__v')
      .sort({ createAt: 'desc' })
  }

  // TODO: needs to be improved!
  async getCollections() {
    const genres = await this.getAll()
    const collections = genres

    return collections
  }

  // Admin place
  async byId(id: string) {
    const genre = await this.GenreModel.findById(id)
    if (!genre) throw new NotFoundException('Genre not found')

    return genre
  }

  async create() {
    const defaultValue: CreateGenreDto = {
      name: '',
      slug: '',
      description: '',
      icon: '',
    }
    const genre = await this.GenreModel.create(defaultValue)

    return genre._id
  }

  async update(_id: string, dto: CreateGenreDto) {
    const updateDoc = await this.GenreModel.findByIdAndUpdate(_id, dto, {
      new: true,
    }).exec()
    if (!updateDoc) throw new NotFoundException('Genre not found')

    return updateDoc
  }

  async delete(_id: string) {
    const deleteDoc = await this.GenreModel.findByIdAndDelete(_id).exec()
    if (!deleteDoc) throw new NotFoundException('Genre not found')

    return deleteDoc
  }
}
