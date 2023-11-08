import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserByEmail } from '@/utils/users.data';
export const authOptions = {
  session: {
    stategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error('Email and password are required');
        }

        const checkuser = getUserByEmail(email);
        if (!checkuser) {
          throw new Error('User not found');
        }

        if (checkuser.password !== password) {
          throw new Error('Invalid password');
        }
        const user = {
          id: checkuser.id,
          name: checkuser.name,
          email: checkuser.email,
        };
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
};
export default NextAuth(authOptions);
