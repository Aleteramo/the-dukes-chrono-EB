declare module 'next/server' {
    import { NextApiRequest } from 'next';
  
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
      constructor(body?: BodyInit | null, init?: {
        status?: number;
        headers?: HeadersInit;
      });
  
      static json(body?: any, init?: {
        status?: number;
        headers?: HeadersInit;
      }): NextResponse;
  
      static redirect(url: string, status?: number): NextResponse;
      static next(): NextResponse;
    }
  }