'use client'

import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import { ReactNode } from 'react'

interface ProvidersProps {
    children: ReactNode
}
const Providers = ({ children}: ProvidersProps) => {
    const queryClient = new QueryClient()
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default Providers