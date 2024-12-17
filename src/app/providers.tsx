'use client'

import { ThemeProvider } from 'styled-components'
import StyledComponentsRegistry from './registry'

const theme = {
    colors: {
        primary: '#333',
    },
}

export default function Providers({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <StyledComponentsRegistry>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </StyledComponentsRegistry>
    )
}