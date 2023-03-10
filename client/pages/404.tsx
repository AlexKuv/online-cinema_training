import { FC } from 'react'

import Heading from '@/ui/heading/Heading'
import Meta from '@/utils/meta/Meta'

const Error404: FC = () => {
  return (
    <Meta title="Page not found">
      <Heading title="404 - Page not found" />
    </Meta>
  )
}

export default Error404
