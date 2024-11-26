import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="font-playfair text-2xl font-bold text-white"
          >
            Eduardo Belletti
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/catalogo" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Catalogo
            </Link>
            <Link 
              href="/about" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Chi Sono
            </Link>
            <Link 
              href="/servizi" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Servizi
            </Link>
            <Link 
              href="/contatti" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Contatti
            </Link>
          </div>

          {/* Mobile Menu Button - da implementare */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}