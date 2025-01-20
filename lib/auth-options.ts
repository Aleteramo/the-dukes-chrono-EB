import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';

interface CustomUser {
  id: string;
  email: string;
  username?: string;
  name?: string;
  role: 'ADMIN' | 'USER' | 'MODERATOR';
  touchCount?: number;
  locale?: string;
}

interface Credentials {
  username: string;
  password: string;
  touchCount?: number | string;
  locale?: string;
}

const loginAttempts: Record<string, { attempts: number; lastAttempt: number }> = {};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
        locale: { label: 'Locale', type: 'text' }
      },
      async authorize(credentials: Credentials | undefined) {
        if (!credentials?.username || !credentials?.password) {
          console.error('Missing credentials');
          return null;
        }

        const currentTime = Date.now();
        const userAttempts = loginAttempts[credentials.username] || { attempts: 0, lastAttempt: 0 };

        if (currentTime - userAttempts.lastAttempt < 5 * 60 * 1000 && userAttempts.attempts >= 5) {
          console.error('Too many login attempts');
          return null;
        }

        if (credentials.username === 'admin' && credentials.password === 'Admin123!@#') {
          loginAttempts[credentials.username] = {
            attempts: (userAttempts.attempts || 0) + 1,
            lastAttempt: currentTime
          };

          delete loginAttempts[credentials.username];

          return {
            id: '1',
            username: 'admin',
            email: 'admin@example.com',
            name: 'Admin User',
            role: 'ADMIN',
            locale: credentials.locale || 'en'
          };
        }

        console.error('Invalid credentials');
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          username: user.username,
          email: user.email,
          locale: (user as CustomUser).locale || 'en'
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: token.role as 'ADMIN' | 'USER' | 'MODERATOR',
          username: token.username as string | undefined,
          locale: token.locale as string
        }
      };
    },
    async redirect({ baseUrl, url }) {
      // Parse the URL to extract locale
      const parsedUrl = new URL(url);
      const pathname = parsedUrl.pathname;
      
      // Return to base URL
      return baseUrl;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
};

export default authOptions;