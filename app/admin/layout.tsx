'use client';

import React, { use, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { CustomButton } from '@/components/CustomInputs/CustomButton';
import { SelectorDetails } from '@/components/common/modals/details/SelectorDetails';

import { url } from '@/libs/utils/url';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
   const router = useRouter();
   const pathname = usePathname();
   const { data: session } = useSession();

   const activeTab = pathname.toLowerCase().includes('post');

   useEffect(() => {
      if (!session) {
         router.push(url.home());
      }
   }, [session, router]);

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
                           containerStyles={activeTab ? 'btn-primary' : 'btn-secondary'}
                        />
                        <div className="mr-5" />
                        <CustomButton
                           title="Usuarios"
                           handleClick={() => router.push(url.adminUsers())}
                           containerStyles={!activeTab ? 'btn-primary' : 'btn-secondary'}
                        />
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
