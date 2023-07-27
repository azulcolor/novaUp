'use client';

import React, { useEffect } from 'react';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import Image from 'next/image';

import { url } from '@/libs/utils/url';
import { apiRequest } from '@/libs/axios-api';

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
            if (auth) {
               setCookie('nova-access-token', auth, {
                  httpOnly: false,
                  secure: process.env.NODE_ENV !== 'development',
                  path: '/',
                  maxAge: 60 * 60 * 24 * 7,
                  sameSite: 'lax',
               });
            } else {
               setTimeout(() => {
                  signOut();
               }, 5000);
            }
         }
      })();
   }, [session]);

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
               {links.map((link) => (
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
               ))}

               {!session && <li onClick={() => signIn()}>Iniciar sesion</li>}
               {session && <li onClick={() => handleSignOut()}>Cerrar sesion</li>}
            </ul>
         </div>
      </div>
   );
};
