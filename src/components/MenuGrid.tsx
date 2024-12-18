'use client'
import styled, { keyframes } from 'styled-components'
import { FaUser, FaEnvelope, FaGithub, FaFolder } from 'react-icons/fa'
import { CRTText } from '@/components/styles/CRTText'
import { rgbShift } from '@/components/styles/CRTText'

interface MenuGridProps {
    onContactClick: () => void;
    isExiting?: boolean;
}

interface MenuContainerProps {
    $isExiting?: boolean;
}

const MenuContainer = styled.div<MenuContainerProps>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;
  width: max-content;
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

const MenuItem = styled.div<{ delay: number, onClick?: () => void }>`
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
  animation-delay: ${({ delay }) => delay}s;

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

export const MenuGrid = ({ onContactClick, isExiting }: MenuGridProps) => {
    return (
        <MenuContainer $isExiting={isExiting}>
            <MenuItem delay={0}>
                <FaFolder />
                <CRTText data-text="Portfolio">Portfolio</CRTText>
            </MenuItem>
            <MenuItem delay={0.4} onClick={onContactClick}>
                <FaEnvelope />
                <CRTText data-text="Contacto">Contacto</CRTText>
            </MenuItem>
            <MenuItem delay={0.8}>
                <FaUser />
                <CRTText data-text="Sobre mí">Sobre mí</CRTText>
            </MenuItem>
            <MenuItem delay={1.2}>
                <FaGithub />
                <CRTText data-text="Github">Github</CRTText>
            </MenuItem>
        </MenuContainer>
    )
}