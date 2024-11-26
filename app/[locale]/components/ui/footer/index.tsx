// src/components/ui/footer/index.tsx
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">
              The Dukes Chrono
            </h3>
            <p className="text-gray-400">
              Orologi vintage di prestigio selezionati con cura
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Collegamenti Rapidi</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/catalogo" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Catalogo
                </Link>
              </li>
              <li>
                <Link 
                  href="/chi-sono" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Chi Sono
                </Link>
              </li>
              <li>
                <Link 
                  href="/servizi" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Servizi
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contatti</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="https://www.instagram.com/thedukes.chrono"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="mailto:eduardobelletti@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} The Dukes Chrono. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer