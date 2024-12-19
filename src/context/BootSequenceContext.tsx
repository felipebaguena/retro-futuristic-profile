'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface BootSequenceContextType {
    hasSeenBootSequence: boolean
    setHasSeenBootSequence: (value: boolean) => void
    hasSeenNavbarAnimation: boolean
    setHasSeenNavbarAnimation: (value: boolean) => void
}

const BootSequenceContext = createContext<BootSequenceContextType | undefined>(undefined)

export function BootSequenceProvider({ children }: { children: ReactNode }) {
    const [hasSeenBootSequence, setHasSeenBootSequence] = useState(false)
    const [hasSeenNavbarAnimation, setHasSeenNavbarAnimation] = useState(false)

    return (
        <BootSequenceContext.Provider value={{
            hasSeenBootSequence,
            setHasSeenBootSequence,
            hasSeenNavbarAnimation,
            setHasSeenNavbarAnimation
        }}>
            {children}
        </BootSequenceContext.Provider>
    )
}

export function useBootSequence() {
    const context = useContext(BootSequenceContext)
    if (context === undefined) {
        throw new Error('useBootSequence must be used within a BootSequenceProvider')
    }
    return context
} 