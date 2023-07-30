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
   isPinned: boolean;
   type: string;
   tags: string;
   comments: string;
}

export interface IPostRequest {
   id: number;
   category: ICategory;
   coverImage?: string;
   assets: IAssets[];
   isPinned: boolean;
   title: string;
   description: string;
   summary: string;
   publishDate: string;
   eventDate: string;
   isApproved: boolean;
   type: string;
   tags: string;
   comments: string;
}

export interface IPostForm extends IPostRequest {
   typeSelect: ICatalogGen;
   currentTag: string;
   tagsList: string[];
   images: File[];
   pdfs: File[];
   videos: IVideoForm[];
}

export interface IVideoForm {
   title: string;
   url: string;
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
