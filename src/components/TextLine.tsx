import { Line } from '@/components/styles/TerminalStyles'

interface TextLineProps {
    text: string;
}

export const TextLine = ({ text }: TextLineProps) => (
    <Line data-text={text}>{text}</Line>
) 