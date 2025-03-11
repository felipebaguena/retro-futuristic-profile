import styled from 'styled-components';

export const CodeSnippetContainer = styled.div`
  background: #1e1e1e;
  border-radius: 8px;
  margin: 2rem 0;
  overflow: visible;
  position: relative;
`;

export const CodeHeader = styled.div`
  background: #2d2d2d;
  padding: 0.8rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #3d3d3d;
  position: relative;
  z-index: 1;
`;

export const CodeTitle = styled.span`
  color: #e0e0e0;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9rem;
  text-align: center;
`;

export const CodeContent = styled.pre`
  padding: 1.5rem 1rem;
  margin: 0.5rem 0;
  color: #e0e0e0;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  position: relative;
  text-align: left;
  
  display: block;
  overflow-x: auto;
  max-width: 100%;
  
  white-space: pre;
  tab-size: 2;
  -moz-tab-size: 2;
  
  &::-webkit-scrollbar {
    height: 8px;
    background-color: #1e1e1e;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4a5568;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    font-size: 0.6rem;
    padding: 0.5rem;
    margin: 0.25rem 0;
    white-space: pre-wrap;
    word-break: break-all;
    line-height: 1.3;
    
    &::-webkit-scrollbar {
      height: 6px;
    }
  }
`;

interface TooltipProps {
  $x: number;
  $y: number;
  $position: 'top' | 'bottom' | 'left' | 'right';
}

export const TooltipModal = styled.div<TooltipProps>`
  position: fixed;
  left: ${props => props.$x}px;
  top: ${props => props.$y}px;
  background: #2d2d2d;
  color: #e0e0e0;
  padding: 1rem;
  border-radius: 6px;
  max-width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  z-index: 9999;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  line-height: 1.5;
  pointer-events: none;
  transform: translate(-50%, 
    ${props => props.$position === 'top' ? 'calc(-100% - 10px)' : '10px'}
  );
  
  &::after {
    content: '';
    position: absolute;
    ${props => props.$position === 'top' ? 'bottom: -5px' : 'top: -5px'};
    left: 50%;
    transform: translateX(-50%);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-${props => props.$position === 'top' ? 'top' : 'bottom'}: 6px solid #2d2d2d;
  }

  @media (max-width: 768px) {
    max-width: calc(100vw - 40px);
    font-size: 0.8rem;
    padding: 0.75rem;
  }
`;

export const CodeAnnotation = styled.div`
  background: #2d2d2d;
  padding: 1rem;
  border-top: 1px solid #3d3d3d;
  color: #e0e0e0;
  font-size: 0.9rem;
  line-height: 1.6;
  min-height: 2.5rem;
  transition: all 0.2s ease;
  word-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.75rem;
    min-height: 2rem;
  }
`;

interface AnnotatedSpanProps {
    $isAnnotated: boolean;
}

export const AnnotatedSpan = styled.span<AnnotatedSpanProps>`
  position: relative;
  cursor: ${props => props.$isAnnotated ? 'help' : 'default'};
  background-color: ${props => props.$isAnnotated ? '#2d3748' : 'transparent'};
  padding: ${props => props.$isAnnotated ? '0 4px' : '0'};
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.$isAnnotated ? '#3d4758' : 'transparent'};
  }
`; 