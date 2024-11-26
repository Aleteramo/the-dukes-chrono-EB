import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { Pathnames } from 'next-intl/navigation';

// Specify all available locales
export const locales = ['it', 'en', 'fr', 'es'] as const;
export type Locale = typeof locales[number];

// Specify default locale
export const defaultLocale: Locale = 'en';

// Define pathname patterns for internationalized routes
export const pathnames = {
  '/': '/',
  '/catalogo': {
    it: '/catalogo',
    en: '/catalog',
    fr: '/catalogue',
    es: '/catalogo'
  }
} satisfies Pathnames<typeof locales>;

export const localePrefix = 'always';

export type AppPathnames = keyof typeof pathnames;

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale is supported
  if (!(locales as readonly string[]).includes(locale)) {
    // If locale is not supported, redirect to default locale
    locale = defaultLocale;
  }

  try {
    // Load messages for the requested locale
    const messages = (await import(`../messages/${locale}.json`)).default;
    return { 
      messages,
      timeZone: 'America/New_York' // Imposta il fuso orario per gli USA
    };
  } catch (error) {
    // If messages fail to load, try loading default locale
    if (locale !== defaultLocale) {
      const defaultMessages = (await import(`../messages/${defaultLocale}.json`)).default;
      return { 
        messages: defaultMessages,
        timeZone: 'America/New_York'
      };
    }
    // If even default locale fails, throw error
    throw error;
  }
});
