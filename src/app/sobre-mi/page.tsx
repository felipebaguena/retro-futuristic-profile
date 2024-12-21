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
import { TextLine } from '@/components/TextLine'
import { sobreMiTexts } from '@/constants/sobreMiTexts'

const CRTProfileSection = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  margin: 1rem 0;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`

const CRTTextContent = styled.div`
  flex: 1;
  min-width: 0;

  ${Line} {
    position: relative;
    display: block;
    width: 100%;
    text-align: left;

    &::before {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      text-align: left;
    }

    @media (max-width: 768px) {
      width: 100%;
    }
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

const SectionBlock = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  
  &:first-child {
    margin-top: 0;
  }

  ${Line} {
    margin: 0.5rem 0;
    
    &:first-child { // Para los títulos
      margin-bottom: 1rem;
      color: ${({ theme }) => theme.colors.crtHighlight};
    }
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
                        <CRTProfileSection>
                            <CRTTextContent>
                                <ModernText>
                                    Texto placeholder para la sección Sobre mí...
                                </ModernText>
                            </CRTTextContent>
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
                        </CRTProfileSection>
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
                                <CRTProfileSection>
                                    <CRTTextContent>
                                        <SectionBlock>
                                            <TextLine text={sobreMiTexts.intro} />
                                        </SectionBlock>

                                        <SectionBlock>
                                            <TextLine text={sobreMiTexts.formacionTitle} />
                                            <TextLine text={sobreMiTexts.formacionContent} />
                                        </SectionBlock>

                                        <SectionBlock>
                                            <TextLine text={sobreMiTexts.habilidadesTitle} />
                                            <TextLine text={sobreMiTexts.habilidadesContent} />
                                        </SectionBlock>

                                        <SectionBlock>
                                            <TextLine text={sobreMiTexts.interesesTitle} />
                                            <TextLine text={sobreMiTexts.interesesContent} />
                                        </SectionBlock>
                                    </CRTTextContent>
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
                                </CRTProfileSection>
                            </Terminal>
                        </CRTContentContainer>
                    </Screen>
                </CRTContainer>
            </CRTOuter>
        </>
    )
} 