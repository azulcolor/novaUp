/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect } from 'react';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import Image from 'next/image';

import { url } from '@/libs/utils/url';
import { apiRequest } from '@/libs/axios-api';
import jwt from 'jsonwebtoken';

interface LinkItem {
   label: string;
   path: string;
   action: () => void;
}

export const Header = () => {
   const router = useRouter();
   const pathname = usePathname();
   const { data: session } = useSession();

   // next-auth need this for authenticate with external nova-up api
   useEffect(() => {
      (async () => {
         const token = getCookie('nova-access-token');
         if (session && !token) {
            const auth = await apiRequest.login({
               googleToken: (session as any)?.token?.token?.account?.id_token,
            });
            console.log(auth);
            if (auth) {
               setCookie('nova-access-token', auth, {
                  httpOnly: false,
                  secure: process.env.NODE_ENV !== 'development',
                  path: '/',
                  maxAge: 60 * 60 * 24 * 7,
                  sameSite: 'lax',
               });
            } else {
               signOut();
            }
         }
      })();
   }, [session]);

   useEffect(() => {
      const token = getCookie('nova-access-token');
      if (token) {
         try {
            const decoded = jwt.decode(String(token)) as any;
            const now = Math.floor(Date.now() / 1000);
            if (decoded && decoded.exp && now >= decoded.exp) {
               throw new Error('Token expired');
            } else if (!decoded) {
               throw new Error('Invalid token');
            }
         } catch {
            deleteCookie('nova-access-token', {
               path: '/',
               sameSite: 'lax',
               secure: process.env.NODE_ENV !== 'development',
            });
            signOut();
         }
      }
      const cookieError = getCookie('next-auth.session-token.0');
      if (cookieError) {
         for (let i = 0; i < 10; i++) {
            deleteCookie(`next-auth.session-token.${i}`, {
               path: '/',
               sameSite: 'lax',
               secure: process.env.NODE_ENV !== 'development',
            });
         }
      }
      router.prefetch(url.home());
      router.prefetch(url.posts());
      if (token) {
         router.prefetch(url.adminPosts());
      }
   }, [pathname]);

   const handleSignOut = async () => {
      deleteCookie('nova-access-token', {
         path: '/',
         sameSite: 'lax',
         secure: process.env.NODE_ENV !== 'development',
      });
      signOut();
   };

   const links: LinkItem[] = [
      {
         label: 'Principal',
         path: '/',
         action: () => router.push(url.home()),
      },
      {
         label: 'Categorías',
         path: '/posts',
         action: () => router.push(url.posts()),
      },
      {
         label: 'Administración',
         path: '/admin',
         action: () => router.push(url.adminPosts()),
      },
   ];
   return (
      <div className="header">
         <div className="header__logo">
            <Image src={'/assets/images/logo.png'} alt="logo" width={160} height={90} />
         </div>

         <div className="header__nav-link">
            <ul>
               {links.map((link) =>
                  link.path.includes('admin') && !session ? null : (
                     <li
                        key={link.label}
                        onClick={link.action}
                        className={
                           pathname.split('/')[1] === link.path.split('/')[1]
                              ? 'border-b'
                              : ''
                        }>
                        {link.label}
                     </li>
                  )
               )}

               {!session && <li onClick={() => signIn()}>Iniciar sesion</li>}
               {session && <li onClick={() => handleSignOut()}>Cerrar sesion</li>}
            </ul>
         </div>
      </div>
   );
};
