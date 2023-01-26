import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'

import { MovieModel } from './movie.model'
import { UpdateMovieDto } from './dto/updateMovie.dto'

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(MovieModel) private readonly MovieModel: ModelType<MovieModel>
  ) {}

  async getAll(searchTerm?: string) {
    let options = {}

    if (searchTerm) {
      options = {
        $or: [
          {
            title: new RegExp(searchTerm, 'i'),
          },
        ],
      }
    }

    return this.MovieModel.find(options)
      .select('-updatedAt -__v')
      .sort({ createdAt: 'desc' })
      .populate('genres actors')
      .exec()
  }

  async bySlug(slug: string) {
    const doc = await this.MovieModel.findOne({ slug })
      .populate('genres actors')
      .exec()
    if (!doc) throw new NotFoundException('Movie is not found')

    return doc
  }

  async byActor(actorId: Types.ObjectId) {
    const docs = await this.MovieModel.find({ actors: actorId }).exec()
    if (!docs) throw new NotFoundException('Movies is not found')

    return docs
  }

  async byGenres(genreIds: Types.ObjectId[]) {
    const docs = this.MovieModel.find({ genres: { $in: genreIds } }).exec()
    if (!docs) throw new NotFoundException('Movie is not found')

    return docs
  }

  async getMostPopular() {
    return this.MovieModel.find({ countOpened: { $gt: 0 } })
      .sort({ countOpened: -1 })
      .populate('genres')
      .exec()
  }

  async updateCountOpened(slug: string) {
    const updateMovie = await this.MovieModel.findOneAndUpdate(
      { slug },
      { $inc: { countOpened: 1 } },
      { new: true }
    ).exec()
    if (!updateMovie) throw new NotFoundException('Movie is not found')

    return updateMovie
  }

  async updateRating(id: Types.ObjectId, newRating: number) {
    return this.MovieModel.findByIdAndUpdate(
      id,
      {
        rating: newRating,
      },
      {
        new: true,
      }
    ).exec()
  }

  /* Admin place */

  async byId(_id: string) {
    const movie = await this.MovieModel.findById(_id)
    if (!movie) throw new NotFoundException('Movie is not found')

    return movie
  }

  async create() {
    const defaultValue: UpdateMovieDto = {
      bigPoster: '',
      actors: [],
      genres: [],
      poster: '',
      title: '',
      videoUrl: '',
      slug: '',
    }
    const movie = await this.MovieModel.create(defaultValue)

    return movie._id
  }

  async update(id: string, dto: UpdateMovieDto) {
    const updateMovie = await this.MovieModel.findByIdAndUpdate(id, dto, {
      new: true,
    }).exec()
    if (!updateMovie) throw new NotFoundException('Movie is not found')

    return updateMovie
  }

  async delete(id: string) {
    const removedMovie = await this.MovieModel.findByIdAndDelete(id).exec()
    if (!removedMovie) throw new NotFoundException('Movie is not found')

    return removedMovie
  }
}
