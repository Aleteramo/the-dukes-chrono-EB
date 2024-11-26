import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

// Funzione per ottenere la lingua preferita dal browser
function getPreferredLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return 'it';

  // Cerca prima una corrispondenza esatta per it o en
  if (acceptLanguage.includes('it')) return 'it';
  if (acceptLanguage.includes('en')) return 'en';

  // Se non trova corrispondenze esatte, usa italiano come default
  return 'it';
}

export default createMiddleware({
  locales: ['en', 'it'],
  defaultLocale: 'it',
  localePrefix: 'always'
});

// Configure matcher to support all routes
export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // However, match all pathnames within `/icons`, even if they
    // contain a dot
    '/icons/(.*)'
  ]
};
