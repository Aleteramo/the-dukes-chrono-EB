declare module './i18n.ts' {
    export const locales: string[];
    export function getLocalePrefix(locale: string): string;
  }