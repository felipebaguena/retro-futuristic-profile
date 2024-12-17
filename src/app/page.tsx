'use client'
import styled from 'styled-components'

const Title = styled.h1`
  color: #333;
  font-size: 2.5rem;
  text-align: center;
  margin-top: 2rem;
`

export default function Home() {
  return (
    <main>
      <Title>¡Hola Mundo!</Title>
    </main>
  )
}
