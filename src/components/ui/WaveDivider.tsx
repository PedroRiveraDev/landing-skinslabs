import { ReactNode } from 'react'

interface WaveDividerProps {
    children?: ReactNode
    className?: string
    variant?: 'wave' | 'diagonal' | 'gradient'
}

export default function WaveDivider({ variant = 'wave', className = '', children }: WaveDividerProps) {
    if (variant === 'gradient') {
        return (
            <div className={`h-20 bg-gradient-to-b from-transparent to-slate-950/80 ${className}`}>
                {children}
            </div>
        )
    }

    if (variant === 'diagonal') {
        return (
            <div className={`relative h-24 ${className}`}>
                <svg className="absolute w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0L1440 100H0V0Z" fill="rgba(2,6,23,0.8)" />
                </svg>
                {children}
            </div>
        )
    }

    return (
        <div className={`relative h-24 ${className}`}>
            <svg className="absolute w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 100C360 20 720 70 1440 0V100H0Z" fill="rgba(2,6,23,0.8)" />
            </svg>
            {children}
        </div>
    )
} 