import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';

// Type augmentation for next-auth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      role: 'ADMIN' | 'USER';
    }
  }

  interface User {
    id: string;
    username: string;
    email: string;
    role: 'ADMIN' | 'USER';
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    email: string;
    role: 'ADMIN' | 'USER';
  }
}

// Export an empty object if you don't want to export anything specific
export {};