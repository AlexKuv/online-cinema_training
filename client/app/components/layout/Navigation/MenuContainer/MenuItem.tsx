import { FC } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import cn from 'classnames'

import { IMenuItem } from './menu.interface'
import MaterialIcon from '@/components/ui/MaterialIcon'

import styles from './Menu.module.css'

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
  const { asPath } = useRouter()

  return (
    <li
      className={cn({
        [styles.active]: asPath === item.link,
      })}
    >
      <Link href={item.link}>
        <MaterialIcon name={item.icon} />
        <span>{item.title}</span>
      </Link>
    </li>
  )
}

export default MenuItem
