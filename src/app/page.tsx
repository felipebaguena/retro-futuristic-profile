'use client'
import styled from 'styled-components'
import { CRTContainer, Scanline, Screen } from '@/components/styles/CRTEffect'
import { CRTOuter } from '@/components/styles/CRTEffect'
import { CRTText } from '@/components/styles/CRTText'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 1.5rem;
`

const Title = styled(CRTText)`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  padding: 0;
`

export default function Home() {
  return (
    <CRTOuter>
      <CRTContainer>
        <Scanline />
        <Screen>
          <Content>
            <Title data-text="Terminal Ready_">Terminal Ready_</Title>
          </Content>
        </Screen>
      </CRTContainer>
    </CRTOuter>
  )
}
