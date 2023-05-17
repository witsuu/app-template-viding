'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { suspense: true } } }))

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}