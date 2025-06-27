import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function TestPage() {
    const { userId } = await auth();

    if (!userId) {
        return redirect('/sign-in?redirect_url=/test-page');
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <h1 className="text-4xl font-bold">PRIVADO: Página de Prueba</h1>
                <p>Si puedes ver esto, es porque has iniciado sesión correctamente. ¡Felicidades!</p>
            </div>
        </main>
    );
} 