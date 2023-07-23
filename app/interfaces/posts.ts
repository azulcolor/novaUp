import { ICatalogGen } from './common';

export type IPostType = IPostRequest;

export interface IPost {
   id: number;
   categoryName: string;
   category: ICategory;
   coverImage: string;
   assets: IAssets[];
   title: string;
   description: string;
   summary: string;
   publishDate: string;
   eventDate: string;
   isApproved: boolean;
   isCanceled: boolean;
   type: string;
   tags: string;
   comments: string;
}

export interface IPostRequest {
   id: number;
   category: ICategory;
   career: ICatalogGen;
   coverImage?: string;
   assets: IAssets[];
   isPinned: boolean;
   title: string;
   description: string;
   summary: string;
   publishDate: string;
   eventDate: string;
   isApproved: boolean;
   isCanceled: boolean;
   type: string;
   tags: string;
   comments: string;
}

export interface IAssets {
   id: number;
   name: string;
   type: string;
}

export interface ICategory {
   id: number;
   name:
      | 'Deportes'
      | 'Culturales'
      | 'Tecnológicas'
      | 'Académicas'
      | 'Graduaciones'
      | 'Proyectos'
      | 'Investigación'
      | 'Convocatoria';
}
