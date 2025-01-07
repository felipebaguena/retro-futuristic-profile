'use client'
import styled, { createGlobalStyle } from 'styled-components'
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
import {
  ModernPageContainer,
  ModernContentContainer,
  CRTContentContainer
} from '@/components/styles/CommonElements'

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
  min-height: calc(100vh - 4rem);
  margin-top: 4rem;
`

const Title = styled.div`
  font-family: 'Arial', sans-serif;
  color: #fff;
  text-align: left;
  line-height: 1.2;
  text-transform: uppercase;
  padding: 6rem 0;

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

const VHSContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
`

const codeChars = [
  '{', '}', '[', ']', '<', '>', '/', '\\', '=',
  '+', '-', '*', '&', '|', ';', '$', '#', '@',
  '(', ')', '_', ':', '"', "'", '`', '^', '%',
  'div', '/', '<', '>'
]

const VHSTitle = styled(Title)`
  position: relative;
  text-shadow: 0.1em 0.1em 0.2em rgba(0, 0, 0, 0.6);
  padding-left: 2rem;
  padding-right: 2rem;

  h1, h2, p {
    position: relative;
    animation: textWaver 3s infinite;
    color: rgba(255, 255, 255, 0.9);

    &::before {
      content: attr(data-glitch);
      position: absolute;
      left: -2px;
      text-shadow: 2px 0 #ff0000;
      clip: rect(44px, 450px, 56px, 0);
      animation: glitch 3s infinite linear alternate-reverse;
    }

    &::after {
      content: attr(data-text);
      position: absolute;
      left: 2px;
      text-shadow: -2px 0 #00ff00;
      clip: rect(44px, 450px, 56px, 0);
      animation: glitch 2s infinite linear alternate-reverse;
      opacity: 0.5;
    }
  }
`

const GlobalStyle = createGlobalStyle`
  @keyframes textWaver {
    0%, 100% { transform: translateX(0) skew(0deg); }
    30% { transform: translateX(-2px) skew(-0.1deg); }
    60% { transform: translateX(2px) skew(0.1deg); }
  }

  @keyframes glitch {
    0% { clip: rect(31px, 9999px, 94px, 0); }
    20% { clip: rect(62px, 9999px, 42px, 0); }
    40% { clip: rect(16px, 9999px, 78px, 0); }
    60% { clip: rect(94px, 9999px, 38px, 0); }
    80% { clip: rect(58px, 9999px, 71px, 0); }
    100% { clip: rect(89px, 9999px, 25px, 0); }
  }
`

const codeSnippets = [
  [
    'const executeBootSequence = async () => {',
    '  await typeText("Iniciando sistema...");',
    '  await wait(1000);',
    '  await typeText("Cargando módulos...");',
    '}'
  ],
  [
    'useEffect(() => {',
    '  const glitchInterval = setInterval(() => {',
    '    if (Math.random() < 0.35) {',
    '      setGlitchText(prev => ({',
    '        ...prev,',
    '        h1: glitchString(prev.h1)',
    '      }))',
    '    }',
    '  }, 1000)',
    '}, [])'
  ],
  [
    'const VHSTitle = styled(Title)`',
    '  position: relative;',
    '  text-shadow: 0.1em 0.1em 0.2em rgba(0, 0, 0, 0.6);',
    '  animation: textWaver 3s infinite;',
    '`'
  ],
  [
    'const handlePortfolioClick = async () => {',
    '  setIsLoadingPortfolio(true);',
    '  const success = await executePortfolioSequence();',
    '  if (success) router.push("/portfolio");',
    '}'
  ],
  [
    '@keyframes glitch {',
    '  0% { clip: rect(31px, 9999px, 94px, 0); }',
    '  20% { clip: rect(62px, 9999px, 42px, 0); }',
    '  100% { clip: rect(89px, 9999px, 25px, 0); }',
    '}'
  ],
  [
    'const handleGithubClick = () => {',
    '  setMenuExiting(true);',
    '  setTimeout(() => {',
    '    setIsLoadingGithub(true);',
    '  }, 500);',
    '}'
  ],
  [
    'const ModernContentContainer = styled.div`',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  width: 100%;',
    '`'
  ]
]

const FloatingCode = styled.div<{ top: number, left: number, opacity: number }>`
  position: absolute;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, ${props => props.opacity});
  pointer-events: none;
  transition: opacity 0.5s ease-in-out;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.7);
  white-space: pre;
  line-height: 1.2;
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
  const [glitchText, setGlitchText] = useState({
    h1: "Hola,",
    h2: "Soy Felipe Báguena,",
    p1: "desarrollador web.",
    p2: "Bienvenido."
  })
  const [floatingSnippets, setFloatingSnippets] = useState<Array<{
    id: number,
    lines: string[],
    top: number,
    left: number,
    opacity: number,
    visibleLines: number
  }>>([])

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

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.35) {
        setGlitchText(prev => {
          const glitchString = (str: string) => {
            const chars = str.split('')
            const numReplacements = Math.floor(str.length * 0.1)
            for (let i = 0; i < numReplacements; i++) {
              const randomIndex = Math.floor(Math.random() * chars.length)
              chars[randomIndex] = codeChars[Math.floor(Math.random() * codeChars.length)]
            }
            return chars.join('')
          }

          return {
            h1: glitchString("Hola,"),
            h2: glitchString("Soy Felipe Báguena,"),
            p1: glitchString("desarrollador web."),
            p2: glitchString("Bienvenido.")
          }
        })

        setTimeout(() => {
          setGlitchText({
            h1: "Hola,",
            h2: "Soy Felipe Báguena,",
            p1: "desarrollador web.",
            p2: "Bienvenido."
          })
        }, 400)
      }
    }, 1000)

    return () => clearInterval(glitchInterval)
  }, [])

  useEffect(() => {
    let snippetId = 0
    const addSnippet = () => {
      if (Math.random() < 0.35) {
        const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
        const newSnippet = {
          id: snippetId++,
          lines: snippet,
          top: Math.random() * 80,
          left: Math.random() * 80,
          opacity: 0.3 + Math.random() * 0.4,
          visibleLines: 0
        }

        setFloatingSnippets(prev => [...prev, newSnippet])

        const showLines = setInterval(() => {
          setFloatingSnippets(prev =>
            prev.map(s =>
              s.id === newSnippet.id && s.visibleLines < s.lines.length
                ? { ...s, visibleLines: s.visibleLines + 1 }
                : s
            )
          )
        }, 80)

        setTimeout(() => {
          clearInterval(showLines)
          setTimeout(() => {
            setFloatingSnippets(prev => prev.filter(s => s.id !== newSnippet.id))
          }, 1500)
        }, snippet.length * 80 + 1500)
      }
    }

    const interval = setInterval(addSnippet, 1000)
    return () => clearInterval(interval)
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
        <GlobalStyle />
        <PortfolioNavbar theme="eva" />
        <ModernPageContainer>
          <TitleContainer>
            <VHSContainer>
              {floatingSnippets.map(snippet => (
                <FloatingCode
                  key={snippet.id}
                  top={snippet.top}
                  left={snippet.left}
                  opacity={snippet.opacity}
                >
                  {snippet.lines.slice(0, snippet.visibleLines).join('\n')}
                </FloatingCode>
              ))}
              <ModernContentContainer>
                <VHSTitle>
                  <h1 data-text="Hola," data-glitch={glitchText.h1}>{glitchText.h1}</h1>
                  <h2 data-text="Soy Felipe Báguena," data-glitch={glitchText.h2}>{glitchText.h2}</h2>
                  <p data-text="desarrollador web." data-glitch={glitchText.p1}>{glitchText.p1}</p>
                  <p data-text="Bienvenido." data-glitch={glitchText.p2}>{glitchText.p2}</p>
                </VHSTitle>
              </ModernContentContainer>
            </VHSContainer>
          </TitleContainer>
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

