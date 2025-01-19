import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    username: string;
    role: 'ADMIN' | 'USER';
  }

  interface Session {
    user: {
      id: string;
      username: string;
      role: 'ADMIN' | 'USER';
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    username: string;
    role: 'ADMIN' | 'USER';
    email: string;
  }
}