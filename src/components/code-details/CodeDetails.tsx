import {
    CodeSnippetContainer,
    CodeHeader,
    CodeTitle,
    CodeContent,
    CodeAnnotation,
    AnnotatedSpan,
    TooltipModal,
} from './CodeDetailsElements'
import { useState, useCallback } from 'react';

interface Annotation {
    start: number;
    end: number;
    text: string;
}

interface CodeDetailsProps {
    title: string;
    code: string;
    annotations?: Annotation[];
    description?: string;
}

interface TooltipState {
    text: string;
    x: number;
    y: number;
    visible: boolean;
    position: 'top' | 'bottom' | 'left' | 'right';
}

export const CodeDetails = ({ title, code, annotations = [], description }: CodeDetailsProps) => {
    const [tooltip, setTooltip] = useState<TooltipState>({
        text: '',
        x: 0,
        y: 0,
        visible: false,
        position: 'top'
    });

    const handleAnnotationInteraction = useCallback((event: React.MouseEvent, text: string, show: boolean) => {
        if (show) {
            const rect = event.currentTarget.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            // Calcular posición inicial
            let x = rect.left + (rect.width / 2);
            let y = rect.top;
            let position: 'top' | 'bottom' | 'left' | 'right' = 'top';

            // Ancho estimado del tooltip (300px + padding)
            const tooltipWidth = 320;
            const tooltipHeight = 100; // Altura estimada
            
            // Ajustar posición horizontal si está cerca de los bordes
            if (x - (tooltipWidth / 2) < 10) {
                x = tooltipWidth / 2 + 10;
            } else if (x + (tooltipWidth / 2) > viewportWidth - 10) {
                x = viewportWidth - (tooltipWidth / 2) - 10;
            }

            // Ajustar posición vertical si está cerca del borde superior o inferior
            if (y - tooltipHeight < 10) {
                y = rect.bottom + tooltipHeight / 2;
                position = 'bottom';
            } else if (y + tooltipHeight > viewportHeight - 10) {
                y = rect.top - 10;
                position = 'top';
            }

            setTooltip({
                text,
                x,
                y,
                visible: true,
                position
            });
        } else {
            setTooltip(prev => ({ ...prev, visible: false }));
        }
    }, []);

    const renderCodeWithAnnotations = () => {
        if (!annotations.length) return code;

        let result = [];
        let lastIndex = 0;

        const sortedAnnotations = [...annotations].sort((a, b) => a.start - b.start);

        sortedAnnotations.forEach((annotation, index) => {
            if (annotation.start > lastIndex) {
                result.push(
                    <span key={`text-${index}`}>
                        {code.slice(lastIndex, annotation.start)}
                    </span>
                );
            }

            result.push(
                <AnnotatedSpan 
                    key={`annotation-${index}`}
                    $isAnnotated={true}
                    onMouseEnter={(e) => handleAnnotationInteraction(e, annotation.text, true)}
                    onMouseLeave={(e) => handleAnnotationInteraction(e, annotation.text, false)}
                    onClick={(e) => handleAnnotationInteraction(e, annotation.text, !tooltip.visible)}
                >
                    {code.slice(annotation.start, annotation.end)}
                </AnnotatedSpan>
            );

            lastIndex = annotation.end;
        });

        if (lastIndex < code.length) {
            result.push(
                <span key="text-final">
                    {code.slice(lastIndex)}
                </span>
            );
        }

        return result;
    };

    return (
        <CodeSnippetContainer>
            <CodeHeader>
                <CodeTitle>{title}</CodeTitle>
            </CodeHeader>
            <CodeContent>
                {renderCodeWithAnnotations()}
            </CodeContent>
            <CodeAnnotation>
                {description || "Sitúa el cursor sobre el código resaltado para ver más detalles"}
            </CodeAnnotation>
            {tooltip.visible && (
                <TooltipModal 
                    $x={tooltip.x} 
                    $y={tooltip.y}
                    $position={tooltip.position}
                >
                    {tooltip.text}
                </TooltipModal>
            )}
        </CodeSnippetContainer>
    );
}; 