'use client'
import { ThemeProvider } from 'styled-components'
import StyledComponentsRegistry from './registry'
import { theme } from '@/styles/theme'
import { BootSequenceProvider } from '@/context/BootSequenceContext'
import { GlobalStyle } from '@/styles/GlobalStyle'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning>
        <StyledComponentsRegistry>
          <BootSequenceProvider>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              {children}
            </ThemeProvider>
          </BootSequenceProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}