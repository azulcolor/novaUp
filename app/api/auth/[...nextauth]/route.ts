import { apiAuth } from '@/app/libs/axios-api/auth';
import { setCookie } from 'cookies-next';
import NextAuth, {
   User as NextAuthUser,
   Account,
   Profile,
   DefaultUser,
   Session,
} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { SessionContextValue } from 'next-auth/react';

interface IUser extends DefaultUser {
   novaAccessToken: string;
}

declare module 'next-auth' {
   interface User extends IUser {}
   interface Session {
      user?: User;
   }
}

declare module 'next-auth/jwt' {
   interface JWT extends IUser {}
}

export const authOptions = {
   providers: [
      GoogleProvider({
         clientId: process.env.NEXT_PUBLIC_GOOGLE_ID || '',
         clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET || '',
      }),
   ],
   pages: {
      signOut: '/',
      error: '/',
   },
   callbacks: {
      async signIn(data: any): Promise<{ user: IUser } | false> {
         if (
            data?.account?.id_token &&
            data?.account?.provider === 'google' &&
            data.user
         ) {
            console.log(data?.account?.id_token);
            const auth = await apiAuth.login({ googleToken: data.account?.id_token });
            if (auth) {
               return true as any;
            }
         }
         return false;
      },
      async jwt(token: any): Promise<any> {
         if (token) {
            token;
         }
         return token as any;
      },
      async session(session: any): Promise<Session> {
         return session as any;
      },
   },
};

export default NextAuth(authOptions as any);
