'use client'
import styled, { keyframes } from 'styled-components'
import { CRTContainer, Scanline, Screen, CRTOuter } from '@/components/styles/CRTEffect'
import { Terminal, Line } from '@/components/styles/TerminalStyles'
import { Navbar } from '@/components/Navbar'
import { PortfolioNavbar } from '@/components/PortfolioNavbar'
import { useBootSequence } from '@/context/BootSequenceContext'
import { useEffect, useState } from 'react'
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

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const SectionBlock = styled.div<{ delay: number }>`
  padding: 1rem;
  margin: 1rem 0;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: ${({ delay }) => delay}ms;
  
  &:first-child {
    margin-top: 0;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  ${Line} {
    margin: 0.5rem 0;
    
    &:first-child {
      margin-bottom: 1rem;
      color: ${({ theme }) => theme.colors.crtHighlight};
    }
  }
`

const StyledTextLineWrapper = styled.div`
  flex: 1;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    margin-top: 0;
  }

`

const StyledCRTImageContainer = styled(CRTImageContainer)`
  flex: none !important;
  width: 230px !important;
  height: 230px !important;
  min-width: 230px;
  min-height: 230px;

    @media (max-width: 980px) {
    width: 300px !important;
    height: 300px !important;
    min-width: 250px;
    min-height: 250px;
  }

  @media (max-width: 768px) {
    width: 250px !important;
    height: 250px !important;
    min-width: 200px;
    min-height: 200px;
  }
`

const IntroSection = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: 6rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  @media (max-width: 1024px) {
    gap: 2rem;
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
                                        <SectionBlock delay={0}>
                                            <IntroSection>
                                                <StyledTextLineWrapper>
                                                    <TextLine text={sobreMiTexts.intro} />
                                                </StyledTextLineWrapper>
                                                <StyledCRTImageContainer>
                                                    <Image
                                                        src="/images/fotocv1.jpg"
                                                        alt="Felipe Báguena"
                                                        fill
                                                        style={{ objectFit: 'cover' }}
                                                        sizes="300px"
                                                        priority
                                                    />
                                                </StyledCRTImageContainer>
                                            </IntroSection>
                                        </SectionBlock>

                                        <SectionBlock delay={500}>
                                            <TextLine text={sobreMiTexts.formacionTitle} />
                                            <TextLine text={sobreMiTexts.formacionContent} />
                                        </SectionBlock>

                                        <SectionBlock delay={1000}>
                                            <TextLine text={sobreMiTexts.habilidadesTitle} />
                                            <TextLine text={sobreMiTexts.habilidadesContent} />
                                        </SectionBlock>

                                        <SectionBlock delay={1500}>
                                            <TextLine text={sobreMiTexts.interesesTitle} />
                                            <TextLine text={sobreMiTexts.interesesContent} />
                                        </SectionBlock>
                                    </CRTTextContent>

                                </CRTProfileSection>
                            </Terminal>
                        </CRTContentContainer>
                    </Screen>
                </CRTContainer>
            </CRTOuter>
        </>
    )
} 