'use client'
import styled from 'styled-components'

const ProgressContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: #eee;
  border-radius: 2px;
  overflow: hidden;
`

const Progress = styled.div<{ $progress: number }>`
  width: ${props => props.$progress}%;
  height: 100%;
  background-color: #000;
  transition: width 0.3s ease;
`

const ProgressText = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-family: 'Arial', sans-serif;
  color: #000;
  font-size: 0.9rem;
`

interface ModernProgressBarProps {
    progress: number;
}

export const ModernProgressBar = ({ progress }: ModernProgressBarProps) => (
    <ProgressContainer>
        <ProgressBar>
            <Progress $progress={progress} />
        </ProgressBar>
        <ProgressText>{progress}%</ProgressText>
    </ProgressContainer>
) 