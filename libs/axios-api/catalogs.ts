import { api } from '@/libs/axios-api/axios';
import { ICatalogGen } from '@/app/interfaces';

export const apiCatalogs = {
   getCategories: async (): Promise<ICatalogGen[]> =>
      await api('next', 'POST', '/catalogs/categories')
         .then((data) => data)
         .catch((e) => false),

   getDepartments: async (): Promise<ICatalogGen[]> =>
      await api('next', 'GET', '/catalogs/departments')
         .then((data) => data)
         .catch((e) => []),

   getRoles: async (): Promise<ICatalogGen[]> =>
      await api('next', 'GET', '/catalogs/roles')
         .then((data) => data)
         .catch((e) => []),
};
