import Layout from '@/components/layout/Layout'
import { FC } from 'react'

import { IHome } from './home.interface'

const Home: FC<IHome> = () => {
  return (
    <Layout>
      <div className="">Home</div>
    </Layout>
  )
}

export default Home
