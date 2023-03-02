import { FC, PropsWithChildren } from 'react'

import Navigation from './Navigation/Navigation'
import Sidebar from './Sidebar/Sidebar'

import styles from './Layout.module.css'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navigation />
      <div className={styles.center}>{children}</div>
      <Sidebar />
    </div>
  )
}

export default Layout
