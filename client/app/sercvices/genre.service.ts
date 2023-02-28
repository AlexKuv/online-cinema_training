import { getGenresUrl } from '@/config/api.config'
import { IGenre } from '@/shared/types/movie.types'
import { axiosClassic } from 'api/interceprors'

export const GenreService = {
  async getAll(searchTerm?: string) {
    return axiosClassic.get<IGenre[]>(getGenresUrl(''), {
      params: searchTerm ? { searchTerm } : {},
    })
  },
}
