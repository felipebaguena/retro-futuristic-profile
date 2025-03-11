import {
    CodeSnippetContainer,
    CodeHeader,
    CodeTitle,
    CodeContent,
    CodeAnnotation,
    AnnotatedSpan,
} from './CodeDetailsElements'
import { useState } from 'react';

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

interface TooltipPosition {
    index: number;
    position: 'top' | 'bottom';
}

export const CodeDetails = ({ title, code, annotations = [], description }: CodeDetailsProps) => {
    const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);

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
                    onMouseEnter={() => setActiveAnnotation(annotation.text)}
                    onMouseLeave={() => setActiveAnnotation(null)}
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
                {activeAnnotation || description || "Sitúa el cursor sobre el código resaltado para ver más detalles"}
            </CodeAnnotation>
        </CodeSnippetContainer>
    );
}; 