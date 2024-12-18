'use client'
import styled from 'styled-components'
import { CRTText } from './CRTText'

export const Terminal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 2rem;
  height: 100%;
  font-size: 1.2rem;
  position: relative;
  transform: perspective(1000px) rotateX(4deg) rotateY(0deg);
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 50%;
    background: inherit;
    transform-origin: top;
    transform: rotateX(-8deg);
    pointer-events: none;
    z-index: -1;
  }
`

export const Line = styled(CRTText)`
  margin-bottom: 0.5rem;
  white-space: pre-wrap; 
  position: relative;
  width: 100%;
`

export const Prompt = styled(CRTText)`
  font-family: 'VT323', monospace;
  font-size: 1.4em;
  transform: scaleX(0.7);
  display: inline-block;
  transform-origin: left;

  &::after {
    content: "  ■";
    animation: blink 1s step-end infinite;
    transform: scaleX(1.43);
    display: inline-block;
  }

  @keyframes blink {
    50% { opacity: 0; }
  }
`