'use client'
import styled from 'styled-components'
import { PortfolioNavbar } from '@/components/PortfolioNavbar'
import { useBootSequence } from '@/context/BootSequenceContext'
import { useEffect, useState } from 'react'
import { CRTContainer, Scanline, Screen, CRTOuter } from '@/components/styles/CRTEffect'
import { Terminal, Line } from '@/components/styles/TerminalStyles'
import { ModernProgressBar } from '@/components/ModernProgressBar'
import {
    ModernPageContainer,
    ModernContentContainer,
    ModernTitle,
    CRTContentContainer
} from '@/components/styles/CommonElements'
import { PortfolioView } from '@/components/PortfolioView'

const TransitionContainer = styled.div<{ $isWhite: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${props => props.$isWhite ? 'white' : 'transparent'};
  transition: background-color 0.5s ease;
  suppressHydrationWarning: true;
`

export default function Portfolio() {
    const { setHasSeenBootSequence, hasAppliedNewDesign, setHasAppliedNewDesign } = useBootSequence()
    const [showCRT, setShowCRT] = useState(!hasAppliedNewDesign)
    const [showModern, setShowModern] = useState(false)
    const [showContent, setShowContent] = useState(hasAppliedNewDesign)
    const [progress, setProgress] = useState(0)
    const [isWhiteBackground, setIsWhiteBackground] = useState(hasAppliedNewDesign)

    useEffect(() => {
        if (showContent && !hasAppliedNewDesign) {
            setHasAppliedNewDesign(true)
        }
    }, [showContent])

    useEffect(() => {
        if (hasAppliedNewDesign) {
            return
        }

        const runSequence = async () => {
            for (let i = 0; i <= 90; i += 5) {
                setProgress(i)
                await new Promise(resolve => setTimeout(resolve, 100))
            }

            setIsWhiteBackground(true)
            await new Promise(resolve => setTimeout(resolve, 500))

            setShowCRT(false)
            setShowModern(true)

            for (let i = 90; i <= 100; i++) {
                setProgress(i)
                await new Promise(resolve => setTimeout(resolve, 200))
            }

            await new Promise(resolve => setTimeout(resolve, 1000))
            setShowModern(false)
            setShowContent(true)
        }

        runSequence()
        setHasSeenBootSequence(true)
    }, [])

    return (
        <TransitionContainer $isWhite={isWhiteBackground} suppressHydrationWarning>
            {showCRT && (
                <CRTOuter>
                    <CRTContainer>
                        <Scanline />
                        <Screen>
                            <CRTContentContainer>
                                <Terminal>
                                    <Line data-text={`Aplicando actualización... ${progress}%`}>
                                        Aplicando actualización... {progress}%
                                    </Line>
                                </Terminal>
                            </CRTContentContainer>
                        </Screen>
                    </CRTContainer>
                </CRTOuter>
            )}

            {showModern && <ModernProgressBar progress={progress} />}

            {showContent && (
                <>
                    <PortfolioNavbar />
                    <ModernPageContainer>
                        <ModernContentContainer>
                            <ModernTitle>Portfolio</ModernTitle>
                            <PortfolioView />
                        </ModernContentContainer>
                    </ModernPageContainer>
                </>
            )}
        </TransitionContainer>
    )
} 