'use client'
import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const scrollText = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.33%);
  }
`

const BannerContainer = styled.div`
  width: 100%;
  height: 3rem;
  background-color: #f5f5f5;
  overflow: hidden;
  position: relative;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
`

const ScrollingText = styled.div`
  position: absolute;
  white-space: nowrap;
  animation: ${scrollText} 40s linear infinite;
  padding: 0.875rem;
  font-family: 'Arial', sans-serif;
  color: #333;
  display: flex;
  gap: 0;
  width: fit-content;
  left: 0;
`

export const ScrollingBanner = () => {
    const [text] = useState("Bienvenido a mi portfolio personal • Desarrollador Full Stack • React • Node.js • TypeScript • Next.js • ")

    return (
        <BannerContainer>
            <ScrollingText>
                {text}
                {text}
                {text}
            </ScrollingText>
        </BannerContainer>
    )
} 