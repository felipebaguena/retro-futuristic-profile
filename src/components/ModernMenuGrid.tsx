'use client'
import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { FaUser, FaEnvelope, FaGithub, FaFolder } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useContactForm } from '@/hooks/useContactForm'
import { ModernContactForm } from './ModernContactForm'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const MenuWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 100%;
  height: 20rem;
  margin: 1rem;
  animation: ${fadeIn} 0.6s ease-out forwards;
`

interface MenuItemProps {
    $position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    $hoveredItem: string | null;
}

const getItemDimensions = (position: string, hoveredItem: string | null) => {
    const baseSize = '100%'
    const expandedSize = '125%'
    const shrunkSize = '75%'

    if (!hoveredItem) return { width: baseSize, height: baseSize }

    switch (position) {
        case 'topLeft':
            return hoveredItem === 'topLeft'
                ? { width: expandedSize, height: expandedSize }
                : hoveredItem === 'topRight'
                    ? { width: shrunkSize, height: expandedSize }
                    : hoveredItem === 'bottomLeft'
                        ? { width: expandedSize, height: shrunkSize }
                        : { width: shrunkSize, height: shrunkSize }
        case 'topRight':
            return hoveredItem === 'topRight'
                ? { width: expandedSize, height: expandedSize }
                : hoveredItem === 'topLeft'
                    ? { width: shrunkSize, height: expandedSize }
                    : hoveredItem === 'bottomRight'
                        ? { width: expandedSize, height: shrunkSize }
                        : { width: shrunkSize, height: shrunkSize }
        case 'bottomLeft':
            return hoveredItem === 'bottomLeft'
                ? { width: expandedSize, height: expandedSize }
                : hoveredItem === 'bottomRight'
                    ? { width: shrunkSize, height: expandedSize }
                    : hoveredItem === 'topLeft'
                        ? { width: expandedSize, height: shrunkSize }
                        : { width: shrunkSize, height: shrunkSize }
        case 'bottomRight':
            return hoveredItem === 'bottomRight'
                ? { width: expandedSize, height: expandedSize }
                : hoveredItem === 'bottomLeft'
                    ? { width: shrunkSize, height: expandedSize }
                    : hoveredItem === 'topRight'
                        ? { width: expandedSize, height: shrunkSize }
                        : { width: shrunkSize, height: shrunkSize }
        default:
            return { width: baseSize, height: baseSize }
    }
}

const getBoxShadow = (position: string) => {
    switch (position) {
        case 'topLeft':
            return '-5px -5px 15px rgba(0, 0, 0, 0.1)';
        case 'topRight':
            return '5px -5px 15px rgba(0, 0, 0, 0.1)';
        case 'bottomLeft':
            return '-5px 5px 15px rgba(0, 0, 0, 0.1)';
        case 'bottomRight':
            return '5px 5px 15px rgba(0, 0, 0, 0.1)';
        default:
            return 'none';
    }
};

const MenuItem = styled.div<MenuItemProps>`
  background: white;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Arial', sans-serif;
  overflow: hidden;
  position: relative;
  ${({ $position }) => {
        switch ($position) {
            case 'topLeft':
                return `
          grid-area: 1 / 1 / 2 / 2;
          justify-self: start;
          align-self: start;
        `
            case 'topRight':
                return `
          grid-area: 1 / 2 / 2 / 3;
          justify-self: end;
          align-self: start;
        `
            case 'bottomLeft':
                return `
          grid-area: 2 / 1 / 3 / 2;
          justify-self: start;
          align-self: end;
        `
            case 'bottomRight':
                return `
          grid-area: 2 / 2 / 3 / 3;
          justify-self: end;
          align-self: end;
        `
            default:
                return ''
        }
    }}
  ${({ $position, $hoveredItem }) => {
        const dimensions = getItemDimensions($position, $hoveredItem)
        const isHovered = $hoveredItem === $position
        const shouldShrink = $hoveredItem && !isHovered
        return `
      width: ${dimensions.width};
      height: ${dimensions.height};
      
      svg {
        font-size: ${shouldShrink ? '0.9rem' : '1.2rem'};
        transition: font-size 0.3s ease;
      }
      
      span {
        font-size: ${shouldShrink ? '0.7rem' : '0.9rem'};
        transition: font-size 0.3s ease;
      }
    `
    }}

  &:hover {
    box-shadow: ${({ $position }) => getBoxShadow($position)};
  }
`

const ItemText = styled.span`
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const ModernMenuGrid = () => {
    const router = useRouter()
    const { showContactForm, contactFormExiting, handleContactClick, handleCloseContact } = useContactForm()
    const [hoveredItem, setHoveredItem] = useState<string | null>(null)

    return (
        <MenuWrapper>
            <MenuContainer>
                <MenuItem
                    $position="topLeft"
                    $hoveredItem={hoveredItem}
                    onClick={() => router.push('/sobre-mi')}
                    onMouseEnter={() => setHoveredItem('topLeft')}
                    onMouseLeave={() => setHoveredItem(null)}
                >
                    <FaUser />
                    <ItemText>Sobre mí</ItemText>
                </MenuItem>
                <MenuItem
                    $position="topRight"
                    $hoveredItem={hoveredItem}
                    onClick={handleContactClick}
                    onMouseEnter={() => setHoveredItem('topRight')}
                    onMouseLeave={() => setHoveredItem(null)}
                >
                    <FaEnvelope />
                    <ItemText>Contacto</ItemText>
                </MenuItem>
                <MenuItem
                    $position="bottomLeft"
                    $hoveredItem={hoveredItem}
                    onClick={() => window.open('https://github.com/felipebaguena', '_blank')}
                    onMouseEnter={() => setHoveredItem('bottomLeft')}
                    onMouseLeave={() => setHoveredItem(null)}
                >
                    <FaGithub />
                    <ItemText>Github</ItemText>
                </MenuItem>
                <MenuItem
                    $position="bottomRight"
                    $hoveredItem={hoveredItem}
                    onClick={() => router.push('/portfolio')}
                    onMouseEnter={() => setHoveredItem('bottomRight')}
                    onMouseLeave={() => setHoveredItem(null)}
                >
                    <FaFolder />
                    <ItemText>Portfolio</ItemText>
                </MenuItem>
            </MenuContainer>
            {showContactForm && (
                <ModernContactForm
                    onClose={handleCloseContact}
                    isExiting={contactFormExiting}
                />
            )}
        </MenuWrapper>
    )
} 