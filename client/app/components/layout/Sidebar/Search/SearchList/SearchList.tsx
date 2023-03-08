import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { IMovie } from '@/shared/types/movie.types'
import { getMovieUrl } from '@/config/url.config'

import styles from './SearchList.module.css'

const SearchList: FC<{ movies: IMovie[] }> = ({ movies }) => {
  return (
    <div className={styles.list}>
      {movies.length ? (
        movies.map((movie) => (
          <Link href={getMovieUrl(movie.slug)} key={movie._id}>
            <Image
              src={movie.poster}
              width={50}
              height={50}
              alt={movie.title}
              draggable="false"
              style={{ objectFit: 'cover', objectPosition: 'top' }}
            />
            <span>{movie.title}</span>
          </Link>
        ))
      ) : (
        <div className="text-white text-center my-4">Movies not found</div>
      )}
    </div>
  )
}

export default SearchList
