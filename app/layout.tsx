import './styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/app/components/common/Header';
import { SessionProvider } from 'next-auth/react';
import NextAuthSessionProvider from './providers/sessionProvider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
   children,
   params: { session, ...params },
}: {
   children: React.ReactNode;
   params: any;
}) {
   return (
      <html lang="en">
         <body className={inter.className}>
            <NextAuthSessionProvider>
               <Header />
               {children}
            </NextAuthSessionProvider>
         </body>
      </html>
   );
}
