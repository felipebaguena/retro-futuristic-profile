'use client'
import styled from 'styled-components'

const BannerContainer = styled.div`
  width: 100vw;
  height: 3rem;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-bottom: 2rem;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
`

const BannerText = styled.div`
  font-family: 'Arial', sans-serif;
  color: #333;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`

export const Banner = () => {
    return (
        <BannerContainer>
            <BannerText>
                Desarrollador Full Stack • React • Node.js • TypeScript • Next.js
            </BannerText>
        </BannerContainer>
    )
} 