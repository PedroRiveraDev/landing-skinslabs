import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { metadata } from "./metadata";
import { ClerkProvider } from '@clerk/nextjs'
import { esES } from "@clerk/localizations";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      localization={esES}
      appearance={{
        baseTheme: dark,
        elements: {
          modalBackdrop: 'flex justify-center items-center backdrop-blur-sm',
          card: 'shadow-2xl bg-slate-900/90 border-slate-700',
        },
        layout: {
          socialButtonsPlacement: 'bottom',
          socialButtonsVariant: 'iconButton'
        }
      }}
    >
      <html lang="es">
        <body className={inter.className}>
          <main className="min-h-screen bg-slate-950">
            <ClientLayout>
              {children}
            </ClientLayout>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
