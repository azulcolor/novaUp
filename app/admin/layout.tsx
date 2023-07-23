'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CustomButton } from '../components/CustomInputs/CustomButton';
import { url } from '../libs/utils/url';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
   const router = useRouter();
   return (
      <section>
         <nav className="admin-layout">
            <div className="admin-layout__nav">
               <CustomButton
                  title="Publicaciones"
                  handleClick={() => router.push(url.adminPosts())}
               />
               <div className="mr-5" />
               <CustomButton
                  title="Usuarios"
                  handleClick={() => router.push(url.adminUsers())}
               />
            </div>

            <div>
               <CustomButton title="Crear" handleClick={() => {}} />
            </div>
         </nav>
         {children}
      </section>
   );
}
