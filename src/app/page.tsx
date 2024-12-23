'use client'
import styled from 'styled-components'
import { useEffect, useState, useRef } from 'react'
import { CRTContainer, Scanline, Screen, CRTOuter } from '@/components/styles/CRTEffect'
import { Terminal, Line, Prompt } from '@/components/styles/TerminalStyles'
import { executeBootSequence } from '@/components/BootSequence'
import { MenuGrid } from '@/components/MenuGrid'
import { Navbar } from '@/components/Navbar'
import { PortfolioNavbar } from '@/components/PortfolioNavbar'
import { ContactForm } from '@/components/ContactForm'
import { executeGithubSequence } from '@/components/GithubSequence'
import { useBootSequence } from '@/context/BootSequenceContext'
import { executePortfolioSequence } from '@/components/PortfolioSequence'
import { useRouter } from 'next/navigation'
import { ModernMenuGrid } from '@/components/ModernMenuGrid'
import {
  ModernPageContainer,
  ModernContentContainer,
  CRTContentContainer
} from '@/components/styles/CommonElements'
import { Banner } from '@/components/Banner'

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 26rem);
  width: 100%;
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #432B4F;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
`

const TitleInner = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 3rem 1.2rem;
  box-sizing: border-box;

  @media (max-width: 578px) {
    padding: 2rem 1.2rem;
  }
`

const Title = styled.div`
  font-family: 'Arial', sans-serif;
  color: #fff;
  text-align: left;
  line-height: 1.2;
  text-transform: uppercase;

  h1 {
    font-size: 3.6rem;
    font-weight: bold;
    margin: 0;
    padding: 0;

    @media (max-width: 578px) {
      font-size: 3.2rem;
    }
  }

  h2 {
    font-size: 3.5rem;
    font-weight: bold;
    margin: 0;
    padding: 0;

    @media (max-width: 578px) {
      font-size: 3.1rem;
    }
  }

  p {
    font-size: 2rem;
    margin: 1rem 0;
    opacity: 0.9;

    @media (max-width: 578px) {
      font-size: 1.6rem;
      margin: 0.5rem 0;
    }
  }
`

export default function Home() {
  const [lines, setLines] = useState<string[]>([])
  const [showWelcome, setShowWelcome] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [menuExiting, setMenuExiting] = useState(false)
  const [contactFormExiting, setContactFormExiting] = useState(false)
  const [githubLines, setGithubLines] = useState<string[]>([])
  const [isLoadingGithub, setIsLoadingGithub] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)
  const { hasSeenBootSequence, setHasSeenBootSequence, hasAppliedNewDesign, setHasAppliedNewDesign } = useBootSequence()
  const [showNavbar, setShowNavbar] = useState(true)
  const [showMenu, setShowMenu] = useState(false)
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(false)
  const router = useRouter()
  const [welcomeLines, setWelcomeLines] = useState<string[]>([])

  const executeWelcomeSequence = async () => {
    const messages = [
      "Hola, soy Felipe Báguena.",
      "Esta es mi web personal.",
      "Bienvenido."
    ]

    for (let i = 0; i < messages.length; i++) {
      let currentMessage = ""
      for (let j = 0; j < messages[i].length; j++) {
        await new Promise(resolve => setTimeout(resolve, 30))
        currentMessage += messages[i][j]
        setWelcomeLines(prev => {
          const newLines = [...prev]
          newLines[i] = currentMessage
          return newLines
        })
      }
      await new Promise(resolve => setTimeout(resolve, 300))
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!hasSeenBootSequence) {
        abortControllerRef.current = new AbortController()
        executeBootSequence(setLines, setShowWelcome, setShowContent, abortControllerRef.current.signal)
          .then(() => {
            executeWelcomeSequence().then(() => {
              setShowMenu(true)
            })
          })
        setHasSeenBootSequence(true)
      } else {
        setShowWelcome(true)
        setShowContent(true)
        setWelcomeLines([
          "Hola, soy Felipe Báguena.",
          "Esta es mi web personal.",
          "Bienvenido."
        ])
        setShowMenu(true)
      }

      const searchParams = new URLSearchParams(window.location.search)
      if (searchParams.get('contact') === 'true') {
        handleContactClick()
        window.history.replaceState({}, '', '/')
      }
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const handleClick = () => {
    if (!showWelcome && abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
  }

  const handleContactClick = () => {
    setMenuExiting(true)
    setTimeout(() => {
      setShowContactForm(true)
    }, 500)
  }

  const handleCloseContact = () => {
    setContactFormExiting(true)
    setTimeout(() => {
      setShowContactForm(false)
      setContactFormExiting(false)
      setMenuExiting(false)
    }, 500)
  }

  const handleGithubClick = () => {
    setMenuExiting(true)

    setTimeout(() => {
      setIsLoadingGithub(true)

      const addMessage = (message: string) => {
        setGithubLines(prev => [...prev, message])
      }

      const updateLastMessage = (message: string) => {
        setGithubLines(prev => [...prev.slice(0, -1), message])
      }

      const cleanup = () => {
        setGithubLines([])
        setMenuExiting(false)
        setIsLoadingGithub(false)
      }

      executeGithubSequence(addMessage, updateLastMessage, cleanup)
    }, 500)
  }

  const handleSobreMiClick = () => {
    setMenuExiting(true)
  }

  const handleHomeClick = () => {
    if (showContactForm) {
      handleCloseContact()
    }
  }

  const handlePortfolioClick = async () => {
    setIsLoadingPortfolio(true)
    const success = await executePortfolioSequence(
      setLines,
      setShowNavbar,
      setShowMenu,
      setShowWelcome,
      abortControllerRef.current?.signal
    )
    if (success) {
      router.push('/portfolio')
    }
  }

  if (hasAppliedNewDesign) {
    return (
      <>
        <PortfolioNavbar theme="eva" />
        <ModernPageContainer>
          <ModernContentContainer>
            <TitleContainer>
              <TitleInner>
                <Title>
                  <h1>Hola,</h1>
                  <h2>Soy Felipe Báguena,</h2>
                  <p>desarrollador web.</p>
                  <p>Bienvenido.</p>
                </Title>
              </TitleInner>
            </TitleContainer>
            <Banner />
            <ModernMenuGrid />
          </ModernContentContainer>
        </ModernPageContainer>
      </>
    )
  }

  return (
    <>
      {showWelcome && showNavbar && (
        <Navbar
          onContactClick={handleContactClick}
          onHomeClick={handleHomeClick}
        />
      )}
      <CRTOuter onClick={handleClick} suppressHydrationWarning>
        <CRTContainer>
          <Scanline />
          <Screen>
            <CRTContentContainer>
              <Terminal>
                {lines.map((line, i) => (
                  <Line key={i} data-text={line}>{line}</Line>
                ))}
                {showContent && !isLoadingPortfolio && welcomeLines.map((line, i) => (
                  <Line key={`welcome-${i}`} data-text={line}>{line}</Line>
                ))}
                {isLoadingGithub && githubLines.map((line, i) => (
                  <Line key={`github-${i}`} data-text={line}>{line}</Line>
                ))}
                <Prompt data-text=">">{`> `}</Prompt>
                {!showContactForm && !isLoadingGithub && showMenu && (
                  <MenuContainer>
                    <MenuGrid
                      onContactClick={handleContactClick}
                      onGithubClick={handleGithubClick}
                      onSobreMiClick={handleSobreMiClick}
                      onPortfolioClick={handlePortfolioClick}
                      isExiting={menuExiting}
                      hasAppliedNewDesign={hasAppliedNewDesign}
                    />
                  </MenuContainer>
                )}
                {showContactForm && (
                  <ContactForm
                    onClose={handleCloseContact}
                    isExiting={contactFormExiting}
                  />
                )}
              </Terminal>
            </CRTContentContainer>
          </Screen>
        </CRTContainer>
      </CRTOuter>
    </>
  )
}

