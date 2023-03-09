import { FC, Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import MaterialIcon from '@/components/ui/MaterialIcon'
import { IMovie } from '@/shared/types/movie.types'
import { getGenreUrl, getMovieUrl } from '@/config/url.config'

import styles from './MovieList.module.css'

const MovieItem: FC<{ movie: IMovie }> = ({ movie }) => {
  return (
    <div className={styles.item}>
      <Link href={getMovieUrl(movie.slug)} className={styles.link}>
        <Image
          src={movie.poster}
          width={65}
          height={97}
          alt={movie.title}
          draggable={false}
          priority
        />
      </Link>
      <div className={styles.info}>
        <Link className={styles.title} href={getMovieUrl(movie.slug)}>
          {movie.title}
        </Link>
        <div className={styles.genres}>
          {movie.genres.map((genre, index) => (
            <Fragment key={genre._id}>
              <Link href={getGenreUrl(genre.slug)}>{genre.name}</Link>
              {index < movie.genres.length - 1 ? ', ' : ''}
            </Fragment>
          ))}
        </div>
        <div className={styles.rating}>
          <MaterialIcon name="MdStarRate" />
          <span>{movie.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  )
}

export default MovieItem
