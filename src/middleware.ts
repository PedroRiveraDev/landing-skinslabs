// Middleware desactivado temporalmente para omitir Clerk

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}; 