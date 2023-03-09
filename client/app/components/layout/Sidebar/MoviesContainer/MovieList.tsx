import { FC } from 'react'
import Link from 'next/link'

import { ImovieList } from './movie-list.interface'
import MovieItem from './MovieItem'

import styles from './MovieList.module.css'

const MovieList: FC<ImovieList> = ({ link, title, movies }) => {
  return (
    <div className={styles.list}>
      <h3 className={styles.heading}>{title}</h3>
      {movies.map((movie) => (
        <MovieItem key={movie._id} movie={movie} />
      ))}
      <Link href={link} className={styles.button}>
        See more
      </Link>
    </div>
  )
}

export default MovieList
