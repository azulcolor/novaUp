import { apiAuth } from './auth';
import { apiPosts } from './posts';
import { apiUsers } from './users';
import { apiCatalogs } from './catalogs';
import { api } from './axios';

const apiRequest = {
   ...apiAuth,
   ...apiPosts,
   ...apiUsers,
   ...apiCatalogs,
};

export { apiRequest, api };
