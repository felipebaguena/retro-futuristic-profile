'use client'
import styled from 'styled-components'
import { CRTText, rgbShift } from '@/components/styles/CRTText'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useBootSequence } from '@/context/BootSequenceContext'
import { useEffect } from 'react'
import { FaHome, FaUser, FaEnvelope, FaGithub, FaFolder } from 'react-icons/fa'

const NavContainer = styled.div<{ $firstLoad: boolean }>`
  position: fixed;
  top: 1rem;
  left: 0;
  width: 100%;
  z-index: 10;
  margin-top: 1rem;
  animation: ${props => props.$firstLoad ? 'slideDown 0.5s ease-out' : 'none'};
  
  &::before {
    content: '';
    position: absolute;
    top: -2rem;
    left: 0;
    width: 100%;
    height: calc(100% + 2rem);
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.15) 0%,
      rgba(0, 0, 0, 0.1) 70%,
      rgba(0, 0, 0, 0.05) 100%
    );
    backdrop-filter: blur(15px);
    z-index: -1;
  }
  
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
  position: relative;
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

  @media (max-width: 580px) {
    gap: 1.5rem;
  }
`

const Icon = styled.div`
  display: none;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.crtText};
  animation: ${rgbShift} 4s infinite;

  @media (max-width: 580px) {
    display: block;
  }
`

const Decoration = styled(CRTText)`
  opacity: 0.3;
  margin: 0 2rem;
  font-size: 0.9rem;
  letter-spacing: 0;
  white-space: nowrap;
  overflow: hidden;

  @media (max-width: 580px) {
    display: none;
  }
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

  @media (max-width: 580px) {
    ${CRTText} {
      display: none;
    }
  }
`

const generateAsterisks = (count: number) => {
    return Array(count).fill('*').join(' ')
}

const ASTERISK_COUNT = 25

interface NavbarProps {
    onContactClick?: () => void;
    onHomeClick?: () => void;
}

export const Navbar = ({ onContactClick, onHomeClick }: NavbarProps) => {
    const router = useRouter()
    const asterisks = generateAsterisks(ASTERISK_COUNT)
    const { hasSeenNavbarAnimation, setHasSeenNavbarAnimation } = useBootSequence()

    useEffect(() => {
        // Después de que termine la animación, actualizamos el estado
        const timer = setTimeout(() => {
            setHasSeenNavbarAnimation(true)
        }, 500) // 500ms es la duración de la animación

        return () => clearTimeout(timer)
    }, [])

    const handleContactClick = (e: React.MouseEvent) => {
        e.preventDefault()
        if (window.location.pathname !== '/') {
            router.push('/?contact=true')
        } else if (onContactClick) {
            onContactClick()
        }
    }

    const handleHomeClick = (e: React.MouseEvent) => {
        e.preventDefault()
        if (window.location.pathname === '/') {
            if (onHomeClick) onHomeClick()
        } else {
            router.push('/')
        }
    }

    return (
        <NavContainer $firstLoad={!hasSeenNavbarAnimation}>
            <ContentContainer>
                <Nav>
                    <Decoration data-text={asterisks}>
                        {asterisks}
                    </Decoration>
                    <NavLinks>
                        <NavLink href="/" onClick={handleHomeClick}>
                            <CRTText data-text="Inicio">Inicio</CRTText>
                            <Icon>
                                <FaHome />
                            </Icon>
                        </NavLink>
                        <NavLink href="/portfolio">
                            <CRTText data-text="Portfolio">Portfolio</CRTText>
                            <Icon>
                                <FaFolder />
                            </Icon>
                        </NavLink>
                        <NavLink href="/contacto" onClick={handleContactClick}>
                            <CRTText data-text="Contacto">Contacto</CRTText>
                            <Icon>
                                <FaEnvelope />
                            </Icon>
                        </NavLink>
                        <NavLink href="/sobre-mi">
                            <CRTText data-text="Sobre mí">Sobre mí</CRTText>
                            <Icon>
                                <FaUser />
                            </Icon>
                        </NavLink>
                        <NavLink href="https://github.com/felipebaguena" target="_blank">
                            <CRTText data-text="Github">Github</CRTText>
                            <Icon>
                                <FaGithub />
                            </Icon>
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