import { FC } from 'react'

import Menu from './Menu'
import GenreMenu from './genres/GenreMenu'
import { firstMenu } from './menu.data'

const MenuContainer: FC = () => {
  return (
    <>
      <Menu menu={firstMenu} />
      <GenreMenu />
    </>
  )
}

export default MenuContainer
