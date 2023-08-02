/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { use, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import jwt from 'jsonwebtoken';
import { getCookie } from 'cookies-next';

import { CustomButton } from '@/components/CustomInputs/CustomButton';
import { SelectorDetails } from '@/components/common/modals/details/SelectorDetails';
import MutateUsersContext from '@/context/MutateUsersContext';

import { url } from '@/libs/utils/url';
import { IPost, IUser } from '@/interfaces';
import MutatePostsContext from '@/context/MutatePostsContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
   const router = useRouter();
   const pathname = usePathname();
   const { data: session } = useSession();
   const [users, setUsers] = useState<IUser[]>([]);
   const [posts, setPosts] = useState<IPost[]>([]);
   const [user, setUser] = useState<IUser>({} as any);

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
      } else {
         setTimeout(() => {
            if (!session) {
               router.push(url.home());
            }
         }, 2000);
      }
   }, [session]);

   return (
      <>
         <MutateUsersContext.Provider value={{ users, setUsers }}>
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
                  <MutatePostsContext.Provider value={{ posts, setPosts }}>
                     {children}
                  </MutatePostsContext.Provider>
               </section>
            )}
         </MutateUsersContext.Provider>
      </>
   );
}
