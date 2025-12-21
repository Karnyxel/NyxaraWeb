export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Nyxara</h3>
            <p className="text-gray-400">El bot de Discord definitivo</p>
          </div>
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Nyxara. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  )
}