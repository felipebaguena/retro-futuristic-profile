'use client'
import styled, { keyframes } from 'styled-components'

const rgbShift = keyframes`
  0% {
    text-shadow: 
      -1px 0 2px rgba(255,0,0,0.5),
      1px 0 2px rgba(0,0,255,0.5);
  }
  25% {
    text-shadow: 
      -0.5px 0 2px rgba(255,0,0,0.3),
      0.5px 0 2px rgba(0,0,255,0.3);
  }
  50% {
    text-shadow: 
      -2px 0 2px rgba(255,0,0,0.6),
      2px 0 2px rgba(0,0,255,0.6);
  }
  75% {
    text-shadow: 
      -1.5px 0 2px rgba(255,0,0,0.4),
      1.5px 0 2px rgba(0,0,255,0.4);
  }
  100% {
    text-shadow: 
      -1px 0 2px rgba(255,0,0,0.5),
      1px 0 2px rgba(0,0,255,0.5);
  }
`

export const CRTText = styled.span<{ color?: string }>`
  color: ${props => props.color || props.theme.colors.crtText};
  font-family: 'VT323', monospace;
  animation: ${rgbShift} 4s infinite;
  position: relative;
  
  &::before {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    mix-blend-mode: screen;
    filter: blur(0.5px);
    color: inherit;
  }
`