import { FC, ChangeEvent } from 'react'

import MaterialIcon from '../MaterialIcon'

import styles from './SearchField.module.css'

interface ISeatchField {
  searchTerm: string
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const SearchField: FC<ISeatchField> = ({ searchTerm, handleSearch }) => {
  return (
    <div className={styles.search}>
      <MaterialIcon name="MdSearch" />
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  )
}

export default SearchField
