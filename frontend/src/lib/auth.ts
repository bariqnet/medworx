import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectDB } from './mongodb';
import { User } from './models';

// Mock admin user for demo mode (when DB is unavailable)
const MOCK_ADMIN_USER = {
  id: 'admin-demo-id',
  email: 'admin@medworx.iq',
  password: 'changeme123', // Mock plaintext for demo purposes
  name: 'Admin User',
  role: 'admin',
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const db = await connectDB();

        // Fall back to mock admin user if DB is unavailable
        if (!db) {
          if (credentials.email === MOCK_ADMIN_USER.email &&
              credentials.password === MOCK_ADMIN_USER.password) {
            return {
              id: MOCK_ADMIN_USER.id,
              name: MOCK_ADMIN_USER.name,
              email: MOCK_ADMIN_USER.email,
              role: MOCK_ADMIN_USER.role,
            };
          }
          throw new Error('Invalid credentials');
        }

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error('User not found');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
