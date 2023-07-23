'use client';

import { url } from '@/app/libs/utils/url';
import { deleteCookie } from 'cookies-next';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

interface LinkItem {
   label: string;
   action: () => void;
}

export const Header = () => {
   const router = useRouter();
   const { data: session } = useSession();

   const handleSignOut = async () => {
      deleteCookie('nova-access-token', {
         path: '/',
         secure: process.env.NODE_ENV !== 'development',
      });
      signOut();
   };

   const links: LinkItem[] = [
      {
         label: 'Principal',
         action: () => router.push(url.home()),
      },
      {
         label: 'Categorías',
         action: () => router.push(url.posts()),
      },
      {
         label: 'Administración',
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
                  <li key={link.label} onClick={link.action}>
                     {link.label}
                  </li>
               ))}
               {!session && <li onClick={() => signIn()}>Iniciar sesion</li>}
               {session && <li onClick={() => signOut()}>Cerrar sesion</li>}
            </ul>
         </div>
      </div>
   );
};