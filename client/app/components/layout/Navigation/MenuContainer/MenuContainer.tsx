import { FC } from 'react'

import Menu from './Menu'
import { firstMenu } from './menu.data'

const MenuContainer: FC = () => {
  return <Menu menu={firstMenu}></Menu>
}

export default MenuContainer
