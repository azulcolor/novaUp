'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { CustomButton } from '@/components/CustomInputs/CustomButton';
import { url } from '../../libs/utils/url';
import { SelectorDetails } from '@/components/common/modals/details/SelectorDetails';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
   const router = useRouter();
   const pathname = usePathname();

   const activeTab = pathname.toLowerCase().includes('post');

   return (
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
   );
}
