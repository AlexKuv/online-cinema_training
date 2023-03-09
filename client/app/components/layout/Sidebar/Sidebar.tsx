import { FC } from 'react'

import Search from './Search/Search'
import MoviesContainer from './MoviesContainer/MoviesContainer'

import styles from './Sidebar.module.css'

const Sidebar: FC = () => {
  return (
    <div className={styles.sidebar}>
      <Search />
      <MoviesContainer />
    </div>
  )
}

export default Sidebar
