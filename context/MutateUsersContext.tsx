import { IUser } from '@/interfaces';
import React, { Dispatch, SetStateAction } from 'react';

interface IMutateUsersContext {
   users: IUser[];
   setUsers: (users: IUser[]) => void;
}
const initialContext: IMutateUsersContext = {
   users: [],
   setUsers: (() => {}) as any,
};

export default React.createContext(initialContext);
