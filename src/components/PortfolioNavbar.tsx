'use client'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContactForm } from '@/hooks/useContactForm'
import { ModernContactForm } from './ModernContactForm'

const NavContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  background: white;
  padding: 2.5rem 0;
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
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: #000;
  font-size: 0.9rem;
  text-transform: uppercase;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  font-family: 'Arial', sans-serif;
  letter-spacing: 1px;

  &:hover {
    opacity: 1;
  }
`

export const PortfolioNavbar = () => {
    const router = useRouter()
    const { showContactForm, contactFormExiting, handleContactClick, handleCloseContact } = useContactForm()

    return (
        <>
            <NavContainer>
                <ContentContainer>
                    <Nav>
                        <NavLinks>
                            <NavLink href="/">Inicio</NavLink>
                            <NavLink href="/portfolio">Portfolio</NavLink>
                            <NavLink href="#" onClick={handleContactClick}>
                                Contacto
                            </NavLink>
                            <NavLink href="/sobre-mi">Sobre mí</NavLink>
                            <NavLink href="https://github.com/felipebaguena" target="_blank">
                                Github
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