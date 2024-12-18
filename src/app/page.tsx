'use client'
import { useEffect, useState, useRef } from 'react'
import { CRTContainer, Scanline, Screen, CRTOuter } from '@/components/styles/CRTEffect'
import { Terminal, Line, Prompt } from '@/components/styles/TerminalStyles'
import { executeBootSequence } from '@/components/BootSequence'
import { MenuGrid } from '@/components/MenuGrid'

export default function Home() {
  const [lines, setLines] = useState<string[]>([])
  const [showWelcome, setShowWelcome] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    abortControllerRef.current = new AbortController()
    executeBootSequence(setLines, setShowWelcome, abortControllerRef.current.signal)

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

  return (
    <CRTOuter onClick={handleClick}>
      <CRTContainer>
        <Scanline />
        <Screen>
          <Terminal>
            {lines.map((line, i) => (
              <Line key={i} data-text={line}>{line}</Line>
            ))}
            {showWelcome && (
              <>
                <Line data-text="Esta es la web de Felipe Báguena Peña. Bienvenido.">
                  Esta es la web de Felipe Báguena Peña. Bienvenido.
                </Line>
                <Prompt data-text=">">{`> `}</Prompt>
                <MenuGrid />
              </>
            )}
          </Terminal>
        </Screen>
      </CRTContainer>
    </CRTOuter>
  )
}
