import 'dayjs/locale/pt-br'

import { LocaleProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import { Provider as ChakraThemeProvider } from '@/components/ui/provider'

import { App } from './app'
import { Toaster } from './components/ui/toaster'
import { AuthProvider } from './contexts/auth'
import { queryClient } from './lib/react-query'
dayjs.locale('pt-br')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraThemeProvider>
      <QueryClientProvider client={queryClient}>
        <LocaleProvider locale="pt-BR">
          <Toaster />
          <BrowserRouter>
            <AuthProvider>
              <App />
            </AuthProvider>
          </BrowserRouter>
        </LocaleProvider>
      </QueryClientProvider>
    </ChakraThemeProvider>
  </StrictMode>
)
