import { IMovie } from '@/shared/types/movie.types'

export interface ImovieList {
  title: string
  link: string
  movies: IMovie[]
}
