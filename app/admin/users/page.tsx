import { Table } from '@/components/common/Table';
import { apiRequest } from '@/libs/axios-api';
import { cookies } from 'next/headers';
import React from 'react';

export default async function AdminUsers() {
   const cookieStore = cookies();
   const token = cookieStore.get('nova-access-token')?.value || '';
   const users = await apiRequest.getUSers(token);

   return (
      <div className="admin-container">
         <Table
            users={users}
            data={
               users?.length
                  ? users?.map((user) => {
                       return {
                          id: user.id,
                          Email: user.email,
                          Departamento: user.department.name,
                          'Tipo de usuario': user.role.name,
                       };
                    })
                  : []
            }
            itemsPage={7}
         />
      </div>
   );
}
