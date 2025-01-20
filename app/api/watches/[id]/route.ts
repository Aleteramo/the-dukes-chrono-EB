import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';

// Extend the default types
interface CustomUser {
  id: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

// Define credentials interface
interface Credentials {
  username: string;
  password: string;
}

// Mock user for development
const MOCK_ADMIN_USER: CustomUser = {
  id: '1',
  username: 'admin',
  email: 'admin@example.com',
  role: 'ADMIN'
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Credentials | undefined) {
        console.log('Authorization attempt:', {
          username: credentials?.username,
          passwordProvided: !!credentials?.password
        });

        if (!credentials?.username || !credentials?.password) {
          console.error('Missing credentials');
          return null;
        }

        // For development: hardcoded credentials
        if (
          credentials.username === MOCK_ADMIN_USER.username && 
          credentials.password === 'Admin123!@#'
        ) {
          return MOCK_ADMIN_USER;
        }

        console.error('Invalid credentials');
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as CustomUser & typeof session.user).id = token.id as string;
        (session.user as CustomUser & typeof session.user).role = token.role as 'ADMIN' | 'USER';
        (session.user as CustomUser & typeof session.user).username = token.username as string;
        (session.user as CustomUser & typeof session.user).email = token.email as string;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

export default authOptions;