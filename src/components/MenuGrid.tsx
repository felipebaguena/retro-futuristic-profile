'use client'
import styled, { keyframes } from 'styled-components'
import { FaUser, FaEnvelope, FaGithub, FaFolder } from 'react-icons/fa'
import { CRTText } from '@/components/styles/CRTText'
import { rgbShift } from '@/components/styles/CRTText'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface MenuGridProps {
    onContactClick: () => void;
    onGithubClick: () => void;
    onSobreMiClick: () => void;
    onPortfolioClick: () => void;
    isExiting?: boolean;
    hasAppliedNewDesign: boolean;
}

interface MenuContainerProps {
    $isExiting?: boolean;
}

interface MenuItemProps {
    $delay: number;
    onClick?: () => void;
}

const MenuContainer = styled.div<MenuContainerProps>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  position: relative;
  width: max-content;
  margin: 2rem auto;
  opacity: ${props => props.$isExiting ? 0 : 1};
  transition: opacity 0.5s ease-out;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const MenuItem = styled.div<MenuItemProps>`
  border: 2px solid ${({ theme }) => theme.colors.crtText};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(5, 50, 30, 0.3);
  width: 90px;
  height: 90px;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: ${({ $delay }) => $delay}s;

  &:hover {
    background: rgba(5, 50, 30, 0.5);
    box-shadow: 0 0 10px ${({ theme }) => theme.colors.crtText};
  }

  svg {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.crtText};
    animation: ${rgbShift} 4s infinite;
  }

  ${CRTText} {
    font-size: 0.9rem;
    text-transform: uppercase;
  }
`

export const MenuGrid = ({
    onContactClick,
    onGithubClick,
    onSobreMiClick,
    onPortfolioClick,
    isExiting,
    hasAppliedNewDesign
}: MenuGridProps) => {
    const router = useRouter()

    const handlePortfolioClick = () => {
        if (!hasAppliedNewDesign) {
            onPortfolioClick()
        } else {
            onSobreMiClick()
            setTimeout(() => {
                router.push('/portfolio')
            }, 500)
        }
    }

    const handleSobreMiClick = () => {
        onSobreMiClick()
        setTimeout(() => {
            router.push('/sobre-mi')
        }, 500)
    }

    const handleGithubClick = () => {
        if (!hasAppliedNewDesign) {
            onGithubClick()
        } else {
            window.open('https://github.com/felipebaguena', '_blank')
        }
    }

    return (
        <MenuContainer $isExiting={isExiting}>
            <MenuItem $delay={0} onClick={handlePortfolioClick}>
                <FaFolder />
                <CRTText data-text="Portfolio">Portfolio</CRTText>
            </MenuItem>
            <MenuItem $delay={0.4} onClick={onContactClick}>
                <FaEnvelope />
                <CRTText data-text="Contacto">Contacto</CRTText>
            </MenuItem>
            <MenuItem $delay={0.8} onClick={handleSobreMiClick}>
                <FaUser />
                <CRTText data-text="Sobre mí">Sobre mí</CRTText>
            </MenuItem>
            <MenuItem $delay={1.2} onClick={handleGithubClick}>
                <FaGithub />
                <CRTText data-text="Github">Github</CRTText>
            </MenuItem>
        </MenuContainer>
    )
}