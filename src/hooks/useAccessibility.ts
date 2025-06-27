import { useEffect, useCallback, useState } from 'react';

interface UseAccessibilityOptions {
    onEscape?: () => void;
    trapFocus?: boolean;
    autoFocus?: boolean;
}

export function useAccessibility(options: UseAccessibilityOptions = {}) {
    const { onEscape, trapFocus = false, autoFocus = false } = options;

    // Manejar tecla Escape
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape' && onEscape) {
            onEscape();
        }
    }, [onEscape]);

    // Trap focus para modales
    const handleTabKey = useCallback((event: KeyboardEvent) => {
        if (!trapFocus) return;

        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (event.shiftKey) {
            if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    }, [trapFocus]);

    useEffect(() => {
        if (onEscape) {
            document.addEventListener('keydown', handleKeyDown);
        }

        if (trapFocus) {
            document.addEventListener('keydown', handleTabKey);
        }

        return () => {
            if (onEscape) {
                document.removeEventListener('keydown', handleKeyDown);
            }
            if (trapFocus) {
                document.removeEventListener('keydown', handleTabKey);
            }
        };
    }, [onEscape, trapFocus, handleKeyDown, handleTabKey]);

    // Auto focus
    useEffect(() => {
        if (autoFocus) {
            const focusableElement = document.querySelector(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            ) as HTMLElement;

            if (focusableElement) {
                focusableElement.focus();
            }
        }
    }, [autoFocus]);

    return {
        handleKeyDown,
        handleTabKey,
    };
}

// Hook para manejar preferencias de movimiento reducido
export function useReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (event: MediaQueryListEvent) => {
            setPrefersReducedMotion(event.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return prefersReducedMotion;
}

// Hook para manejar focus visible
export function useFocusVisible() {
    const [isFocusVisible, setIsFocusVisible] = useState(false);

    useEffect(() => {
        const handleFocusVisible = () => setIsFocusVisible(true);
        const handleFocusHidden = () => setIsFocusVisible(false);

        document.addEventListener('focusin', handleFocusVisible);
        document.addEventListener('focusout', handleFocusHidden);

        return () => {
            document.removeEventListener('focusin', handleFocusVisible);
            document.removeEventListener('focusout', handleFocusHidden);
        };
    }, []);

    return isFocusVisible;
} 