import { ICatalogGen } from './common';

export interface IUserRoles {
   role: 'ad' | 'su' | 'ed';
}

export interface IUser {
   id: number;
   email: string;
   role: ICatalogGen;
   department: ICatalogGen;
}

export interface IUserForm {
   id: number;
   email: string;
   role: ICatalogGen;
   department: ICatalogGen;
}

export interface IUserRequest {
   id: number;
   email: string;
   roleId: number;
   departmentId: number;
}

export interface INovaJWTDecode {
   sub: number;
   user: INovaUser;
   iat: number;
   exp: number;
}

export interface INovaUser {
   id: number;
   email: string;
   role: ICatalogGen;
   department: ICatalogGen;
}
