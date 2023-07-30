'use client';

import React, { use, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import jwt from 'jsonwebtoken';

import { CustomButton } from '@/components/CustomInputs/CustomButton';
import { SelectorDetails } from '@/components/common/modals/details/SelectorDetails';

import { url } from '@/libs/utils/url';
import { get } from 'http';
import { getCookie } from 'cookies-next';
import { IUser } from '@/interfaces';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
   const router = useRouter();
   const pathname = usePathname();
   const { data: session } = useSession();
   const [user, setUser] = useState<IUser>(null as any);

   const activeTab = pathname.toLowerCase().includes('post');

   useEffect(() => {
      const token = getCookie('nova-access-token');
      if (token) {
         const decoded = jwt.decode(String(token)) as any;
         const user = decoded?.user;
         if (user) {
            setUser(() => user);
            if (user.role.id === 1) {
               router.prefetch(url.adminUsers());
            }
         }
      }

      if (!session) {
         router.push(url.home());
      }
   }, [session, router, pathname]);

   return (
      <>
         {session && (
            <section>
               {pathname.includes('/admin/posts/') ? null : (
                  <nav className="admin-layout">
                     <div className="admin-layout__nav">
                        <CustomButton
                           title="Publicaciones"
                           handleClick={() => router.push(url.adminPosts())}
                           containerStyles={
                              activeTab ? 'btn-primary--tab' : 'btn-secondary--tab'
                           }
                        />
                        {user?.role.id === 1 && (
                           <CustomButton
                              title="Usuarios"
                              handleClick={() => router.push(url.adminUsers())}
                              containerStyles={
                                 !activeTab
                                    ? 'btn-primary--tab br-left'
                                    : 'btn-secondary--tab'
                              }
                           />
                        )}
                     </div>

                     <div>
                        <SelectorDetails
                           tabSelector={activeTab ? 'posts' : 'users'}
                           action="create"
                        />
                     </div>
                  </nav>
               )}
               {children}
            </section>
         )}
      </>
   );
}
