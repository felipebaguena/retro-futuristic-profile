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