'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface BootSequenceContextType {
    hasSeenBootSequence: boolean
    setHasSeenBootSequence: (value: boolean) => void
    hasSeenNavbarAnimation: boolean
    setHasSeenNavbarAnimation: (value: boolean) => void
    hasAppliedNewDesign: boolean
    setHasAppliedNewDesign: (value: boolean) => void
}

const BootSequenceContext = createContext<BootSequenceContextType | undefined>(undefined)

export function BootSequenceProvider({ children }: { children: ReactNode }) {
    const [hasSeenBootSequence, setHasSeenBootSequence] = useState(false)
    const [hasSeenNavbarAnimation, setHasSeenNavbarAnimation] = useState(false)
    const [hasAppliedNewDesign, setHasAppliedNewDesign] = useState(false)

    return (
        <BootSequenceContext.Provider value={{
            hasSeenBootSequence,
            setHasSeenBootSequence,
            hasSeenNavbarAnimation,
            setHasSeenNavbarAnimation,
            hasAppliedNewDesign,
            setHasAppliedNewDesign
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