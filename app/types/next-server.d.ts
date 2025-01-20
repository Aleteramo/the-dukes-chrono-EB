declare module 'next/server' {
    import { NextApiRequest, NextApiResponse } from 'next';
  
    export interface NextRequest extends NextApiRequest {
      method?: string;
      headers: {
        get(name: string): string | null;
        set(name: string, value: string): void;
      };
      url?: string;
      formData(): Promise<FormData>;
    }
  
    export class NextResponse {
      static json(body?: any, init?: ResponseInit): NextResponse;
      static redirect(url: string, status?: number): NextResponse;
      static next(): NextResponse;
    }
  }