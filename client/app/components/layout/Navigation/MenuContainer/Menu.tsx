import { FC } from 'react'

import { IMenu } from './menu.interface'
import MenuItem from './MenuItem'
import AuthItems from './auth/AuthItems'

import styles from './Menu.module.css'

const Menu: FC<{ menu: IMenu }> = ({ menu: { items, title } }) => {
  return (
    <div className={styles.menu}>
      <div className={styles.heading}>{title}</div>
      <ul className={styles.ul}>
        {items.map((item) => (
          <MenuItem item={item} key={item.link} />
        ))}
        {title === 'General' ? <AuthItems /> : null}
      </ul>
    </div>
  )
}

export default Menu
