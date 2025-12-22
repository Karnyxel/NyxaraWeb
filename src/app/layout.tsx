import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nyxara",
  description: "Bot de Discord con 112 comandos, sistema de música premium, moderación avanzada y dashboard web interactivo.",
  keywords: ["discord bot", "nyxara", "música discord", "moderación", "bot premium"],
  openGraph: {
    type: "website",
    url: "https://nyxara.xyz",
    title: "Nyxara",
    description: "Bot de Discord con 112 comandos, sistema de música premium y moderación avanzada.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nyxara Discord Bot",
    description: "El bot más completo para tu servidor de Discord",
    images: ["/twitter-image.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}


