'use client'
import styled from 'styled-components'
import { CRTContainer, Scanline, Screen } from '@/components/styles/CRTEffect'
import { CRTOuter } from '@/components/styles/CRTEffect'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 1.5rem;
`

export default function Home() {
  return (
    <CRTOuter>
      <CRTContainer>
        <Scanline />
        <Screen>
          <Content>
            <h1>Terminal Ready_</h1>
          </Content>
        </Screen>
      </CRTContainer>
    </CRTOuter>
  )
}
