import type { PropsWithChildren } from 'react'
import { ThemeProvider } from './theme-context'

export function Providers({ children }: PropsWithChildren) {
  return <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
}
