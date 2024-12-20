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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!hasSeenBootSequence) {
        abortControllerRef.current = new AbortController()
        executeBootSequence(setLines, setShowWelcome, setShowContent, abortControllerRef.current.signal).then(() => {
          setShowMenu(true)
        })
        setHasSeenBootSequence(true)
      } else {
        setShowWelcome(true)
        setShowContent(true)
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
        <PortfolioNavbar />
        <ModernContainer>
          <ModernContentContainer>
            <Title>Home</Title>
            <Text>
              Texto placeholder para la sección Home...
            </Text>
            <ModernMenuGrid />
          </ModernContentContainer>
        </ModernContainer>
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
            <ContentContainer>
              <Terminal>
                {lines.map((line, i) => (
                  <Line key={i} data-text={line}>{line}</Line>
                ))}
                {showContent && !isLoadingPortfolio && (
                  <Line data-text="Esta es la web de Felipe Báguena Peña. Bienvenido.">
                    Esta es la web de Felipe Báguena Peña. Bienvenido.
                  </Line>
                )}
                {isLoadingGithub && githubLines.map((line, i) => (
                  <Line key={`github-${i}`} data-text={line}>{line}</Line>
                ))}
                <Prompt data-text=">">{`> `}</Prompt>
                {!showContactForm && !isLoadingGithub && showMenu && (
                  <MenuGrid
                    onContactClick={handleContactClick}
                    onGithubClick={handleGithubClick}
                    onSobreMiClick={handleSobreMiClick}
                    onPortfolioClick={handlePortfolioClick}
                    isExiting={menuExiting}
                    hasAppliedNewDesign={hasAppliedNewDesign}
                  />
                )}
                {showContactForm && (
                  <ContactForm
                    onClose={handleCloseContact}
                    isExiting={contactFormExiting}
                  />
                )}
              </Terminal>
            </ContentContainer>
          </Screen>
        </CRTContainer>
      </CRTOuter>
    </>
  )
}

