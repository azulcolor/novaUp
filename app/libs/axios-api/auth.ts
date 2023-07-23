import { api } from '@/app/libs/axios-api/axios';

interface googleToken {
   googleToken: string;
}

export const apiAuth = {
   login: async (token: googleToken) =>
      await api('next', 'POST', '/login', null, token)
         .then((data) => data)
         .catch((e) => false),
};
