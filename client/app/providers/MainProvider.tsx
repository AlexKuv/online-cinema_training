import { FC, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

type Props = {
  children?: ReactNode
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const MainProvider: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default MainProvider
