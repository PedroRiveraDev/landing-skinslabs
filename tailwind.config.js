/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'fade-in-up': 'fadeInUp 0.5s ease-in-out',
                'bounce-x': 'bounceX 1s infinite',
                'border-glow': 'borderGlow 5s ease-in-out infinite',
                tilt: 'tilt 10s infinite linear',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(10px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    },
                },
                bounceX: {
                    '0%, 100%': {
                        transform: 'translateX(0)',
                        animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
                    },
                    '50%': {
                        transform: 'translateX(25%)',
                        animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
                    },
                },
                borderGlow: {
                    '0%, 100%': {
                        'border-image-source': 'linear-gradient(to right, rgba(56,189,248,0.5), rgba(59,130,246,0.5))',
                    },
                    '50%': {
                        'border-image-source': 'linear-gradient(to right, rgba(59,130,246,0.5), rgba(56,189,248,0.5))',
                    },
                },
                tilt: {
                    '0%, 50%, 100%': {
                        transform: 'rotate(0deg)',
                    },
                    '25%': {
                        transform: 'rotate(1deg)',
                    },
                    '75%': {
                        transform: 'rotate(-1deg)',
                    },
                },
            },
            fontSize: {
                'fluid-hero': 'clamp(2.5rem, 5vw + 1rem, 5rem)',
            },
            backgroundSize: {
                'grid-sm': '32px 32px',
                'grid-lg': '64px 64px',
            },
            spacing: {
                '128': '32rem',
            },
            fontFamily: {
                'cursive': ['Satisfy', 'cursive'],
                'serif-display': ['DM Serif Display', 'serif'],
            },
        },
    },
    plugins: [
        function({ addUtilities }) {
            const newUtilities = {
                '.grid-pattern': {
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                },
                '.text-balance': {
                    textWrap: 'balance',
                },
                '.hover-tilt': {
                    transform: 'perspective(1000px) rotateX(0) rotateY(0)',
                    transition: 'transform 0.5s ease',
                },
                '.hover-tilt:hover': {
                    transform: 'perspective(1000px) rotateX(2deg) rotateY(2deg)',
                },
            }
            addUtilities(newUtilities)
        }
    ],
} 