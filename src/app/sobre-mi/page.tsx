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
    margin: 0;
    padding-bottom: 0;
    padding-top: 0;
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

const ModernLayout = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
`

const HeroSection = styled.div`
  display: flex;
  align-items: center;
  gap: 6rem;
  margin-bottom: 3rem;

  @media (max-width: 968px) {
    flex-direction: column;
    gap: 3rem;
    text-align: center;
  }
`

const ModernImageContainer = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  
  @media (max-width: 968px) {
    width: 400px;
    height: 400px;
  }

    @media (max-width: 468px) {
        width: 300px;
        height: 300px;
}
`

const ContentSection = styled.div`
  flex: 1;
`

const ModernSubheading = styled.h2`
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #2d3436;
  font-size: 1.6rem;
  font-weight: 600;
  margin: 2rem 0 1.5rem;
  letter-spacing: -0.01em;
`

const ModernParagraph = styled.p`
  font-family: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #636e72;
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-weight: 400;
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
          <ModernLayout>
            <HeroSection>
              <ModernImageContainer>
                <Image
                  src="/images/fotocv1.jpg"
                  alt="Felipe Báguena"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 968px) 300px, 400px"
                  priority
                />
              </ModernImageContainer>
              <ContentSection>
                <ModernParagraph>{sobreMiTexts.intro}</ModernParagraph>
              </ContentSection>
            </HeroSection>

            <ModernSubheading>Formación</ModernSubheading>
            <ModernParagraph>{sobreMiTexts.formacionContent}</ModernParagraph>

            <ModernSubheading>Habilidades</ModernSubheading>
            <ModernParagraph>{sobreMiTexts.habilidadesContent}</ModernParagraph>

            <ModernSubheading>Intereses</ModernSubheading>
            <ModernParagraph>{sobreMiTexts.interesesContent}</ModernParagraph>
          </ModernLayout>
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