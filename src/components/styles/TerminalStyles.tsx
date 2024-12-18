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
`

export const Line = styled(CRTText)`
  margin-bottom: 0.5rem;
  white-space: pre-wrap;
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