'use client'
import styled from 'styled-components'
import { CRTText } from '@/components/styles/CRTText'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const NavContainer = styled.div`
  position: fixed;
  top: 1rem;
  left: 0;
  width: 100%;
  z-index: 10;
  margin-top: 1rem;
  animation: slideDown 0.5s ease-out;
  
  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 1rem 1.2rem;
  box-sizing: border-box;
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  overflow: hidden;
`

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  flex-shrink: 0;
`

const Decoration = styled(CRTText)`
  opacity: 0.3;
  margin: 0 2rem;
  font-size: 0.9rem;
  letter-spacing: 0;
  white-space: nowrap;
  overflow: hidden;
`

const NavLink = styled(Link)`
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }

  ${CRTText} {
    font-size: 0.9rem;
    text-transform: uppercase;
  }
`

const generateAsterisks = (count: number) => {
    return Array(count).fill('*').join(' ')
}

const ASTERISK_COUNT = 25

interface NavbarProps {
    onContactClick?: () => void;
}

export const Navbar = ({ onContactClick }: NavbarProps) => {
    const router = useRouter()
    const asterisks = generateAsterisks(ASTERISK_COUNT)

    const handleContactClick = (e: React.MouseEvent) => {
        e.preventDefault()
        if (window.location.pathname !== '/') {
            router.push('/?contact=true')
        } else if (onContactClick) {
            onContactClick()
        }
    }

    return (
        <NavContainer>
            <ContentContainer>
                <Nav>
                    <Decoration data-text={asterisks}>
                        {asterisks}
                    </Decoration>
                    <NavLinks>
                        <NavLink href="/">
                            <CRTText data-text="Inicio">Inicio</CRTText>
                        </NavLink>
                        <NavLink href="/portfolio">
                            <CRTText data-text="Portfolio">Portfolio</CRTText>
                        </NavLink>
                        <NavLink href="/contacto" onClick={handleContactClick}>
                            <CRTText data-text="Contacto">Contacto</CRTText>
                        </NavLink>
                        <NavLink href="/sobre-mi">
                            <CRTText data-text="Sobre mí">Sobre mí</CRTText>
                        </NavLink>
                        <NavLink href="https://github.com/felipebaguena" target="_blank">
                            <CRTText data-text="Github">Github</CRTText>
                        </NavLink>
                    </NavLinks>
                    <Decoration data-text={asterisks}>
                        {asterisks}
                    </Decoration>
                </Nav>
            </ContentContainer>
        </NavContainer>
    )
}