import { Table } from '@/components/common/Table';
import { apiRequest } from '@/libs/axios-api';
import { cookies } from 'next/headers';
import React from 'react';

export default async function AdminUsers() {
   const cookieStore = cookies();
   const token = cookieStore.get('nova-access-token')?.value || '';
   const users = await apiRequest.getUSers(token);

   console.log(token);
   console.log(users);

   return (
      <div className="admin-container">
         <div className="admin-container__table">
            <Table
               data={
                  users?.length
                     ? users?.map((user) => {
                          return {
                             Email: user.email,
                             Departamento: user.department.name,
                             'Tipo de usuario': user.role.name,
                          };
                       })
                     : []
               }
               itemsPage={10}
            />
         </div>
      </div>
   );
}
