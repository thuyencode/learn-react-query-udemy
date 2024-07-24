import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render as RtlRender } from '@testing-library/react'
import { ReactElement } from 'react'
import { MemoryRouter } from 'react-router-dom'

import { queryConfig } from '@/react-query/queryClient'

// ** FOR TESTING CUSTOM HOOKS ** //
// from https://tkdodo.eu/blog/testing-react-query#for-custom-hooks
// export const createQueryClientWrapper = () => {
//   const queryClient = generateQueryClient();
//   return ({ children }: PropsWithChildren) => (
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   );
// };

function generateQueryClient() {
  return new QueryClient({
    ...queryConfig,
    defaultOptions: { queries: { retry: false } }
  })
}

// reference: https://testing-library.com/docs/react-testing-library/setup#custom-render
function customRender(
  ui: ReactElement,
  queryClient: QueryClient = generateQueryClient()
) {
  return RtlRender(
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>{ui}</MemoryRouter>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

// re-export everything
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'

// override render method
export { customRender as render }
