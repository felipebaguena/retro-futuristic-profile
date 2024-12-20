'use client'
import styled from 'styled-components'
import { CRTContainer, Scanline, Screen, CRTOuter } from '@/components/styles/CRTEffect'
import { Terminal, Line } from '@/components/styles/TerminalStyles'
import { Navbar } from '@/components/Navbar'
import { PortfolioNavbar } from '@/components/PortfolioNavbar'
import { useBootSequence } from '@/context/BootSequenceContext'
import { useEffect } from 'react'
import {
    ModernPageContainer,
    ModernContentContainer,
    ModernTitle,
    ModernText,
    CRTContentContainer
} from '@/components/styles/CommonElements'

export default function SobreMi() {
    const { setHasSeenBootSequence, hasAppliedNewDesign } = useBootSequence()

    useEffect(() => {
        setHasSeenBootSequence(true)
    }, [])

    if (hasAppliedNewDesign) {
        return (
            <>
                <PortfolioNavbar />
                <ModernPageContainer>
                    <ModernContentContainer>
                        <ModernTitle>Sobre mí</ModernTitle>
                        <ModernText>
                            Texto placeholder para la sección Sobre mí...
                        </ModernText>
                    </ModernContentContainer>
                </ModernPageContainer>
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
                        <CRTContentContainer>
                            <Terminal>
                                <Line data-text="Sobre mí">Sobre mí</Line>
                                <Line data-text="Texto placeholder para la sección Sobre mí...">
                                    Texto placeholder para la sección Sobre mí...
                                </Line>
                            </Terminal>
                        </CRTContentContainer>
                    </Screen>
                </CRTContainer>
            </CRTOuter>
        </>
    )
} 