import { Dispatch, SetStateAction } from 'react'

export const executeBootSequence = async (
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

    const commands = [
        { text: "BIOS Version 1.0.2", delay: 300 },
        { text: "Checking system memory...", delay: 800 },
        {
            text: "Memory OK - 640K",
            delay: 1200,
            loading: async (setLine: (text: string) => void, delay: (ms: number) => Promise<void>) => {
                for (let i = 0; i <= 100; i += 10) {
                    setLine(`Memory check: ${i}%`)
                    await delay(50)
                }
                return "Memory OK - 640K"
            }
        },
        { text: "Initializing boot sequence...", delay: 400 },
        {
            text: "Loading system files...",
            delay: 1500,
            loading: async (setLine: (text: string) => void, delay: (ms: number) => Promise<void>) => {
                const files = ["SYSTEM.DAT", "DRIVERS.SYS", "CONFIG.SYS"]
                for (const file of files) {
                    setLine(`Loading ${file}...`)
                    await delay(300)
                }
                await delay(600)

                const matrixLines = [
                    async () => {
                        const text = "Wake up, Neo..."
                        for (let i = 1; i <= text.length; i++) {
                            setLine(text.slice(0, i))
                            await delay(20)
                        }
                        await delay(700)
                        return text
                    },
                    async () => {
                        const text = "The Matrix has you..."
                        for (let i = 1; i <= text.length; i++) {
                            setLine(text.slice(0, i))
                            await delay(20)
                        }
                        await delay(700)
                        return text
                    },
                    async () => {
                        const text = "Follow the white rabbit."
                        for (let i = 1; i <= text.length; i++) {
                            setLine(text.slice(0, i))
                            await delay(20)
                        }
                        await delay(700)
                        return text
                    },
                    "Knock, knock, Neo.",
                    async () => {
                        const binaryBytes = [
                            "01001101", "01100001", "01110100",
                            "01110010", "01101001", "01111000"
                        ]
                        let text = ""
                        for (const byte of binaryBytes) {
                            text += byte + " "
                            setLine(text.trim())
                            await delay(200)
                        }
                        return text.trim()
                    },
                    "System breach detected...",
                    "Initiating security protocols..."
                ]

                for (const line of matrixLines) {
                    if (typeof line === 'function') {
                        await line()
                    } else {
                        setLine(line)
                        await delay(800)
                    }
                }
                return "System files loaded."
            }
        },
        { text: "System ready.", delay: 300 },
        { text: "Initializing display driver...", delay: 600 },
        { text: "Display OK.", delay: 200 },
        {
            text: "Loading personal website v1.0...",
            delay: 2000,
            loading: async (setLine: (text: string) => void, delay: (ms: number) => Promise<void>) => {
                for (let i = 0; i <= 100; i += 5) {
                    setLine(`Loading website: ${i}%`)
                    await delay(40)
                }
                return "Website loaded successfully."
            }
        }
    ]

    try {
        for (const command of commands) {
            if (command.loading) {
                const finalText = await command.loading(
                    (text) => {
                        setLines(prev => [...prev.slice(0, -1), text])
                    },
                    delay
                )
                setLines(prev => [...prev.slice(0, -1), finalText])
            } else {
                setLines(prev => [...prev, command.text])
            }
            await delay(command.delay)
        }

        setShowWelcome(true)
        await delay(1000)
        setLines([])
        setShowContent(true)
    } catch (error: unknown) {
        if (error instanceof Error && error.message === 'cancelled') {
            setLines([])
            setShowWelcome(true)
            setShowContent(true)
        }
    }
}