import { FC, ChangeEvent, useState } from 'react'
import { useQuery } from 'react-query'

import SearchField from '@/ui/search-field/SearchField'
import { useDebounce } from '@/hooks/useDebounce'
import { MovieService } from 'sercvices/movie.service'
import SearchList from './SearchList/SearchList'

import styles from './Search.module.css'

const Search: FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)
  const { data, isSuccess } = useQuery(
    ['search movie list', debouncedSearch],
    () => {
      return MovieService.getAll(debouncedSearch)
    },
    {
      select: ({ data }) => data,
      enabled: !!debouncedSearch,
    }
  )
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className={styles.wrapper}>
      <SearchField handleSearch={handleSearch} searchTerm={searchTerm} />
      {isSuccess && <SearchList movies={data || []} />}
    </div>
  )
}

export default Search
