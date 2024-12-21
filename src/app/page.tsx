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
  ModernTitle,
  ModernText,
  CRTContentContainer
} from '@/components/styles/CommonElements'

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 26rem);
  width: 100%;
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
        <PortfolioNavbar />
        <ModernPageContainer>
          <ModernContentContainer>
            <ModernTitle>Home</ModernTitle>
            <ModernText>
              Texto placeholder para la sección Home...
            </ModernText>
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

