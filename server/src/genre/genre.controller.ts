import { Controller } from '@nestjs/common'
import {
  Body,
  Get,
  HttpCode,
  Param,
  Put,
  Post,
  Query,
  UsePipes,
  Delete,
} from '@nestjs/common/decorators'
import { ValidationPipe } from '@nestjs/common/pipes'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { CreateGenreDto } from './dto/createGenre.dto'

import { GenreService } from './genre.service'

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get('by-slug/:slug')
  async bySlug(@Param('slug') slug: string) {
    return this.genreService.bySlug(slug)
  }

  @Get('collections')
  async getCollections() {
    return this.genreService.getCollections()
  }

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.genreService.getAll(searchTerm)
  }

  @Get(':id')
  @Auth('admin')
  async getGenreById(@Param('id', IdValidationPipe) id: string) {
    return this.genreService.byId(id)
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @Auth('admin')
  async createGenre() {
    return this.genreService.create()
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async updateGenre(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: CreateGenreDto
  ) {
    return this.genreService.update(id, dto)
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('admin')
  async deleteGenre(@Param('id', IdValidationPipe) id: string) {
    return this.genreService.delete(id)
  }
}
