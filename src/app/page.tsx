'use client'
import styled from 'styled-components'
import { useEffect, useState, useRef } from 'react'
import { CRTContainer, Scanline, Screen, CRTOuter } from '@/components/styles/CRTEffect'
import { Terminal, Line, Prompt } from '@/components/styles/TerminalStyles'
import { executeBootSequence } from '@/components/BootSequence'
import { MenuGrid } from '@/components/MenuGrid'
import { Navbar } from '@/components/Navbar'
import { ContactForm } from '@/components/ContactForm'
import { executeGithubSequence } from '@/components/GithubSequence'
import { useBootSequence } from '@/context/BootSequenceContext'

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
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
  const { hasSeenBootSequence, setHasSeenBootSequence } = useBootSequence()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!hasSeenBootSequence) {
        abortControllerRef.current = new AbortController()
        executeBootSequence(setLines, setShowWelcome, setShowContent, abortControllerRef.current.signal)
        setHasSeenBootSequence(true)
      } else {
        setShowWelcome(true)
        setShowContent(true)
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

  return (
    <>
      {showWelcome && <Navbar onContactClick={handleContactClick} />}
      <CRTOuter onClick={handleClick}>
        <CRTContainer>
          <Scanline />
          <Screen>
            <ContentContainer>
              <Terminal>
                {lines.map((line, i) => (
                  <Line key={i} data-text={line}>{line}</Line>
                ))}
                {showContent && (
                  <>
                    <Line data-text="Esta es la web de Felipe Báguena Peña. Bienvenido.">
                      Esta es la web de Felipe Báguena Peña. Bienvenido.
                    </Line>
                    {isLoadingGithub && githubLines.map((line, i) => (
                      <Line key={`github-${i}`} data-text={line}>{line}</Line>
                    ))}
                    <Prompt data-text=">">{`> `}</Prompt>
                    {!showContactForm && !isLoadingGithub && (
                      <MenuGrid
                        onContactClick={handleContactClick}
                        onGithubClick={handleGithubClick}
                        isExiting={menuExiting}
                      />
                    )}
                    {showContactForm && (
                      <ContactForm
                        onClose={handleCloseContact}
                        isExiting={contactFormExiting}
                      />
                    )}
                  </>
                )}
              </Terminal>
            </ContentContainer>
          </Screen>
        </CRTContainer>
      </CRTOuter>
    </>
  )
}

