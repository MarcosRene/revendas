import { ChakraProvider } from '@chakra-ui/react'
import { type ThemeProviderProps } from 'next-themes'

import customTheme from '@/styles/theme'

export interface ColorModeProviderProps extends ThemeProviderProps {}

export function Provider(props: ColorModeProviderProps) {
  return <ChakraProvider value={customTheme}>{props.children}</ChakraProvider>
}
