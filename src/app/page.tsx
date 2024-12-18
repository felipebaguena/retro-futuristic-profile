'use client'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CRTContainer, Scanline, Screen } from '@/components/styles/CRTEffect'
import { CRTOuter } from '@/components/styles/CRTEffect'
import { CRTText } from '@/components/styles/CRTText'

const Terminal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 2rem;
  height: 100%;
  font-size: 1.2rem;
`

const Line = styled(CRTText)`
  margin-bottom: 0.5rem;
  white-space: pre-wrap;
`

const Prompt = styled(CRTText)`
  font-family: 'VT323', monospace;
  font-size: 1.4em;
  transform: scaleX(0.7);
  display: inline-block;
  transform-origin: left;

  &::after {
    content: "  ■";
    animation: blink 1s step-end infinite;
    transform: scaleX(1.43);
    display: inline-block;
  }

  @keyframes blink {
    50% { opacity: 0; }
  }
`

export default function Home() {
  const [lines, setLines] = useState<string[]>([])
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    const bootSequence = async () => {
      const commands = [
        { text: "BIOS Version 1.0.2", delay: 300 },
        { text: "Checking system memory...", delay: 800 },
        {
          text: "Memory OK - 640K",
          delay: 1200,
          loading: async (setLine: (text: string) => void) => {
            for (let i = 0; i <= 100; i += 10) {
              setLine(`Memory check: ${i}%`)
              await new Promise(resolve => setTimeout(resolve, 50))
            }
            return "Memory OK - 640K"
          }
        },
        { text: "Initializing boot sequence...", delay: 400 },
        {
          text: "Loading system files...",
          delay: 1500,
          loading: async (setLine: (text: string) => void) => {
            const files = ["SYSTEM.DAT", "DRIVERS.SYS", "CONFIG.SYS"]
            for (const file of files) {
              setLine(`Loading ${file}...`)
              await new Promise(resolve => setTimeout(resolve, 300))
            }
            await new Promise(resolve => setTimeout(resolve, 600))

            const matrixLines = [
              async () => {
                const text = "Wake up, Neo..."
                for (let i = 1; i <= text.length; i++) {
                  setLine(text.slice(0, i))
                  await new Promise(resolve => setTimeout(resolve, 20))
                }
                await new Promise(resolve => setTimeout(resolve, 700))
                return text
              },
              async () => {
                const text = "The Matrix has you..."
                for (let i = 1; i <= text.length; i++) {
                  setLine(text.slice(0, i))
                  await new Promise(resolve => setTimeout(resolve, 20))
                }
                await new Promise(resolve => setTimeout(resolve, 700))
                return text
              },
              async () => {
                const text = "Follow the white rabbit."
                for (let i = 1; i <= text.length; i++) {
                  setLine(text.slice(0, i))
                  await new Promise(resolve => setTimeout(resolve, 20))
                }
                await new Promise(resolve => setTimeout(resolve, 700))
                return text
              },
              "Knock, knock, Neo.",
              "01001101 01100001 01110100 01110010 01101001 01111000",
              "System breach detected...",
              "Initiating security protocols..."
            ]

            for (const line of matrixLines) {
              if (typeof line === 'function') {
                await line()
              } else {
                setLine(line)
                await new Promise(resolve => setTimeout(resolve, 800))
              }
            }
            return "System files loaded."
          }
        },
        { text: "System ready.", delay: 300 },
        { text: "Initializing display driver...", delay: 600 },
        { text: "Display OK.", delay: 200 },
        {
          text: "Loading personal website v1.0...",
          delay: 2000,
          loading: async (setLine: (text: string) => void) => {
            for (let i = 0; i <= 100; i += 5) {
              setLine(`Loading website: ${i}%`)
              await new Promise(resolve => setTimeout(resolve, 40))
            }
            return "Website loaded successfully."
          }
        }
      ]

      for (const command of commands) {
        if (command.loading) {
          const finalText = await command.loading((text) => {
            setLines(prev => [...prev.slice(0, -1), text])
          })
          setLines(prev => [...prev.slice(0, -1), finalText])
        } else {
          setLines(prev => [...prev, command.text])
        }
        await new Promise(resolve => setTimeout(resolve, command.delay))
      }

      await new Promise(resolve => setTimeout(resolve, 1000))
      setLines([])
      setShowWelcome(true)
    }

    bootSequence()
  }, [])

  return (
    <CRTOuter>
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
              </>
            )}
          </Terminal>
        </Screen>
      </CRTContainer>
    </CRTOuter>
  )
}
