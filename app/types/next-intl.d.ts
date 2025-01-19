declare module 'next-intl/middleware' {
  import { NextRequest, NextResponse } from 'next/server';

  export default function createIntlMiddleware(options: {
    locales: string[];
    defaultLocale: string;
    localePrefix?: 'always' | 'as-needed';
  }): (request: NextRequest) => Promise<NextResponse>;
}