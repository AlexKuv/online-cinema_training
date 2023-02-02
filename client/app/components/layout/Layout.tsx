import { FC, ReactNode } from 'react'

import Navigation from './Navigation/Navigation'
import Sidebar from './Sidebar/Sidebar'

import styles from './Layout.module.css'

type Props = {
  children?: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navigation />
      <div className={styles.center}>{children}</div>
      <Sidebar />
    </div>
  )
}

export default Layout
