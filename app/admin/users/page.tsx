import { apiRequest } from '@/app/libs/axios-api';
import React from 'react';

export default async function AdminUsers() {
   const users = await apiRequest.getUSers('');
   console.log(users);
   return (
      <div>
         <h1>Users</h1>
      </div>
   );
}
