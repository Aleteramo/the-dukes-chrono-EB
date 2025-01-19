import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { withAuth } from 'next-auth/middleware';

// Funzione per ottenere la lingua preferita dal browser
function getPreferredLocale(request: NextRequest): 'en' | 'it' {
  const acceptLanguage = request.headers.get('accept-language');
  
  if (!acceptLanguage) return 'en';

  const locales = acceptLanguage.split(',').map(lang => {
    const [code, quality] = lang.trim().split(';');
    const locale = code.split('-')[0];
    const q = quality ? parseFloat(quality.split('=')[1]) : 1;
    return { locale, q };
  });

  const sortedLocales = locales.sort((a, b) => b.q - a.q);
  const supportedLocales = ['en', 'it'];
  const matchedLocale = sortedLocales.find(({ locale }) => 
    supportedLocales.includes(locale)
  );

  return matchedLocale ? matchedLocale.locale as 'en' | 'it' : 'en';
}

export default createMiddleware({
  locales: ['en', 'it'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

// Aggiorna il matcher per gestire tutti i percorsi necessari
export const config = {
  matcher: [
    // Root path
    '/',
    
    // Tutti i percorsi localizzati
    '/(en|it)/:path*',
    
    // Percorsi protetti
    '/(en|it)/admin/:path*',
    '/admin/:path*',
    '/(en|it)/login',
    '/login',
    
    // API routes
    '/api/watches/:path*',

    // Escludi file statici e API
    '/((?!api|_next|static|.*\\..*).*)'
  ]
};