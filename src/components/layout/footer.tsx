import { Bot, Github, Twitter, Heart } from "lucide-react"
import { MessageCircle } from "lucide-react" 
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="mt-32 border-t border-white/10 bg-black/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Bot className="h-8 w-8 text-nyxara-primary" />
              <span className="text-2xl font-bold">Nyxara</span>
            </div>
            <p className="text-gray-400 text-sm">
              El bot de Discord definitivo con más de 100 comandos, 
              sistema de música y moderación avanzada.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <MessageCircle className="h-5 w-5" /> {/* Discord */}
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/comandos" className="text-gray-400 hover:text-white">Comandos</Link></li>
              <li><Link href="/premium" className="text-gray-400 hover:text-white">Premium</Link></li>
              <li><Link href="/docs" className="text-gray-400 hover:text-white">Documentación</Link></li>
              <li><Link href="/status" className="text-gray-400 hover:text-white">Estado</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacidad</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white">Términos</Link></li>
              <li><Link href="/cookies" className="text-gray-400 hover:text-white">Cookies</Link></li>
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h3 className="font-semibold mb-4">Estadísticas</h3>
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold text-nyxara-primary">100+</div>
                <div className="text-sm text-gray-400">Comandos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-nyxara-secondary">24/7</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              © {currentYear} Nyxara. Todos los derechos reservados.
            </div>
            <div className="flex items-center gap-1">
              Hecho con <Heart className="h-4 w-4 text-red-500 mx-1" /> por la comunidad
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}