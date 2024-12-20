'use client'
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

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 600px;
  margin: 3rem auto;
  padding: 0 1rem;
  animation: ${fadeIn} 0.6s ease-out forwards;
`

const MenuItem = styled.div`
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Arial', sans-serif;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  svg {
    font-size: 2rem;
    color: #333;
  }
`

const ItemText = styled.span`
  font-size: 1rem;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 1px;
`

export const ModernMenuGrid = () => {
    const router = useRouter()
    const { showContactForm, contactFormExiting, handleContactClick, handleCloseContact } = useContactForm()

    return (
        <>
            <MenuContainer>
                <MenuItem onClick={() => router.push('/portfolio')}>
                    <FaFolder />
                    <ItemText>Portfolio</ItemText>
                </MenuItem>
                <MenuItem onClick={handleContactClick}>
                    <FaEnvelope />
                    <ItemText>Contacto</ItemText>
                </MenuItem>
                <MenuItem onClick={() => router.push('/sobre-mi')}>
                    <FaUser />
                    <ItemText>Sobre mí</ItemText>
                </MenuItem>
                <MenuItem onClick={() => window.open('https://github.com/felipebaguena', '_blank')}>
                    <FaGithub />
                    <ItemText>Github</ItemText>
                </MenuItem>
            </MenuContainer>
            {showContactForm && (
                <ModernContactForm
                    onClose={handleCloseContact}
                    isExiting={contactFormExiting}
                />
            )}
        </>
    )
} 