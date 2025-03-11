interface CodeExample {
    title: string;
    code: string;
    annotations: {
        start: number;
        end: number;
        text: string;
    }[];
    description: string;
}

export const personalWebsiteExamples: Record<string, CodeExample> = {
    glitchEffect: {
        title: "src/components/effects/GlitchEffect.tsx",
        code: `const glitchText = (text: string) => {
  const chars = text.split('');
  const glitchChars = '!@#$%^&*()';
  
  return chars.map(char => 
    Math.random() > 0.9 
      ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
      : char
  ).join('');
};`,
        annotations: [
            {
                start: 41,
                end: 70,
                text: "Convertimos el texto en un array de caracteres para poder manipularlos individualmente"
            },
            {
                start: 79,
                end: 90,
                text: "Caracteres especiales que usaremos para crear el efecto glitch"
            },
            {
                start: 142,
                end: 161,
                text: "10% de probabilidad de que un carácter sea reemplazado"
            }
        ],
        description: "Este componente crea el efecto de glitch reemplazando aleatoriamente algunos caracteres del texto."
    },
    bootSequence: {
        title: "src/utils/bootSequence.ts",
        code: `const executeBootSequence = async (
    setLines: Dispatch<SetStateAction<string[]>>,
    setShowWelcome: Dispatch<SetStateAction<boolean>>,
    setShowContent: Dispatch<SetStateAction<boolean>>,
    signal: AbortSignal
) => {
    const delay = (ms: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => resolve(), ms);
            signal.addEventListener('abort', () => {
                clearTimeout(timeout);
                reject(new Error('cancelled'));
            });
        });
    };

    const matrixLines = [
        async () => {
            const text = "Wake up, Neo...";
            for (let i = 1; i <= text.length; i++) {
                setLine(text.slice(0, i));
                await delay(20);
            }
            await delay(700);
            return text;
        },
        async () => {
            const text = "The Matrix has you...";
            for (let i = 1; i <= text.length; i++) {
                setLine(text.slice(0, i));
                await delay(20);
            }
            await delay(700);
            return text;
        }
    ];

    for (const line of matrixLines) {
        if (typeof line === 'function') {
            await line();
        } else {
            setLine(line);
            await delay(800);
        }
    }
}`,
        annotations: [
            {
                start: 227,
                end: 563,
                text: "Sistema de cancelación que permite al usuario saltar la animación en cualquier momento. Utiliza AbortSignal para limpiar los timeouts pendientes"
            },
            {
                start: 565,
                end: 1152,
                text: "Implementación del efecto de escritura letra por letra que recrea la famosa escena de Matrix, con delays precisos para simular escritura humana"
            },
            {
                start: 1154,
                end: 1351,
                text: "Sistema flexible que permite mezclar líneas de texto estáticas con funciones animadas, manteniendo la sincronización de la secuencia"
            }
        ],
        description: "Esta función implementa una secuencia de arranque que homenajea la famosa escena de Matrix, combinando efectos de texto con una estructura asíncrona cancelable."
    }
} 