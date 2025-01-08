'use client'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContactForm } from '@/hooks/useContactForm'
import { ModernContactForm } from './ModernContactForm'
import { HiHome, HiFolder, HiMail, HiUser } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'

interface NavContainerProps {
    $theme?: 'default' | 'dark'
}

const NavContainer = styled.div<NavContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  background: ${props => props.$theme === 'dark' ? '#1a1a1a' : 'white'};
  height: 4rem;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
`

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1.2rem;
  box-sizing: border-box;
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 580px) {
    gap: 1.5rem;
  }
`

const NavLink = styled(Link) <{ $theme?: 'default' | 'dark' }>`
  text-decoration: none;
  color: ${props => props.$theme === 'dark' ? '#fff' : '#000'};
  font-size: 0.9rem;
  text-transform: uppercase;
  opacity: 0.7;
  transition: all 0.3s ease;
  font-family: 'Arial', sans-serif;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 580px) {
    span {
      display: none;
    }
  }
`

const Icon = styled.div`
  display: none;
  font-size: 1.3rem;

  @media (max-width: 580px) {
    display: block;
  }
`

interface PortfolioNavbarProps {
    theme?: 'default' | 'dark'
}

export const PortfolioNavbar = ({ theme = 'default' }: PortfolioNavbarProps) => {
    const router = useRouter()
    const { showContactForm, contactFormExiting, handleContactClick, handleCloseContact } = useContactForm()

    return (
        <>
            <NavContainer $theme={theme}>
                <ContentContainer>
                    <Nav>
                        <NavLinks>
                            <NavLink href="/" $theme={theme}>
                                <span>Inicio</span>
                                <Icon>
                                    <HiHome />
                                </Icon>
                            </NavLink>
                            <NavLink href="/sobre-mi" $theme={theme}>
                                <span>Sobre mí</span>
                                <Icon>
                                    <HiUser />
                                </Icon>
                            </NavLink>
                            <NavLink href="#" onClick={handleContactClick} $theme={theme}>
                                <span>Contacto</span>
                                <Icon>
                                    <HiMail />
                                </Icon>
                            </NavLink>
                            <NavLink href="https://github.com/felipebaguena" target="_blank" $theme={theme}>
                                <span>Github</span>
                                <Icon>
                                    <FaGithub />
                                </Icon>
                            </NavLink>
                            <NavLink href="/portfolio" $theme={theme}>
                                <span>Portfolio</span>
                                <Icon>
                                    <HiFolder />
                                </Icon>
                            </NavLink>
                        </NavLinks>
                    </Nav>
                </ContentContainer>
            </NavContainer>
            {showContactForm && (
                <ModernContactForm
                    onClose={handleCloseContact}
                    isExiting={contactFormExiting}
                />
            )}
        </>
    )
} 