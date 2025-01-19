import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'
import '../globals.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import AuthProvider from './components/AuthProvider'
import WhatsAppButton from './components/ui/WhatsAppButton'

const inter = Inter({ subsets: ['latin'] })

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'it' }]
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Imposta il locale per la richiesta
  unstable_setRequestLocale(locale);
  
  // Carica i messaggi per l'internazionalizzazione
  let messages
  try {
    messages = await getMessages({ locale })
  } catch (error) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-black min-h-screen`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow pt-16">
                {children}
              </main>
              <Footer />
              <WhatsAppButton />
            </div>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}