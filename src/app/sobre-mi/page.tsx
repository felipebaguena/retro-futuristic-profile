'use client'
import styled from 'styled-components'
import { CRTContainer, Scanline, Screen, CRTOuter } from '@/components/styles/CRTEffect'
import { Terminal, Line } from '@/components/styles/TerminalStyles'
import { Navbar } from '@/components/Navbar'
import { PortfolioNavbar } from '@/components/PortfolioNavbar'
import { useBootSequence } from '@/context/BootSequenceContext'
import { useEffect } from 'react'

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`

const ModernContainer = styled.div`
  background: white;
  padding-top: 80px;
  display: flex;
  justify-content: center;
`

const ModernContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem;
  color: black;
  font-family: 'Arial', sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
`

const Text = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  text-align: center;
  max-width: 800px;
`

export default function SobreMi() {
    const { setHasSeenBootSequence, hasAppliedNewDesign } = useBootSequence()

    useEffect(() => {
        setHasSeenBootSequence(true)
    }, [])

    if (hasAppliedNewDesign) {
        return (
            <>
                <PortfolioNavbar />
                <ModernContainer>
                    <ModernContentContainer>
                        <Title>Sobre mí</Title>
                        <Text>
                            Texto placeholder para la sección Sobre mí...
                        </Text>
                    </ModernContentContainer>
                </ModernContainer>
            </>
        )
    }

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