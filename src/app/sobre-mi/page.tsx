'use client'
import styled from 'styled-components'
import { CRTContainer, Scanline, Screen, CRTOuter } from '@/components/styles/CRTEffect'
import { Terminal, Line } from '@/components/styles/TerminalStyles'
import { Navbar } from '@/components/Navbar'
import { useBootSequence } from '@/context/BootSequenceContext'
import { useEffect } from 'react'

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`

export default function SobreMi() {
    const { setHasSeenBootSequence } = useBootSequence()

    useEffect(() => {
        setHasSeenBootSequence(true)
    }, [])

    return (
        <>
            <Navbar />
            <CRTOuter>
                <CRTContainer>
                    <Scanline />
                    <Screen>
                        <ContentContainer>
                            <Terminal>
                                <Line data-text="Sobre mí">Sobre mí</Line>
                                <Line data-text="Texto placeholder para la sección Sobre mí...">
                                    Texto placeholder para la sección Sobre mí...
                                </Line>
                            </Terminal>
                        </ContentContainer>
                    </Screen>
                </CRTContainer>
            </CRTOuter>
        </>
    )
} 