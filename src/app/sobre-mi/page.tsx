'use client'
import styled, { keyframes } from 'styled-components'
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
import Image from 'next/image'
import { CRTImageContainer } from '@/components/styles/CRTImage'

const ProfileSection = styled.div`
  display: flex;
  gap: 3rem;
  align-items: flex-start;
  margin: 2rem 0;
  max-width: 1000px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`

const ImageContainer = styled.div`
  flex-shrink: 0;
  width: 300px;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
`

const TextContent = styled.div`
  flex: 1;
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
  }
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
                <ModernPageContainer>
                    <ModernContentContainer>
                        <ModernTitle>Sobre mí</ModernTitle>
                        <ProfileSection>
                            <ImageContainer>
                                <Image
                                    src="/images/fotocv1.jpg"
                                    alt="Felipe Báguena"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 768px) 250px, 300px"
                                    priority
                                />
                            </ImageContainer>
                            <TextContent>
                                <ModernText>
                                    Texto placeholder para la sección Sobre mí...
                                </ModernText>
                            </TextContent>
                        </ProfileSection>
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
                                <CRTImageContainer>
                                    <Image
                                        src="/images/fotocv1.jpg"
                                        alt="Felipe Báguena"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        sizes="300px"
                                        priority
                                    />
                                </CRTImageContainer>
                            </Terminal>
                        </CRTContentContainer>
                    </Screen>
                </CRTContainer>
            </CRTOuter>
        </>
    )
} 