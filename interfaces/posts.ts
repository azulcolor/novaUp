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
   assets: IAssets[];
   title: string;
   description: string;
   summary: string;
   publishDate: string;
   eventDate: string;
   type: string;
   typeSelect: ICatalogGen;
   tags: string;
   comments: string;
   currentTag: string;
   tagsList: string[];
}

export interface IPostPatch {
   categoryId: number;
   title: string;
   description: string;
   summary: string;
   eventDate?: string;
   type: string;
   tags: string;
   comments: string;
}

export interface IPostCurrentResources {
   images: IAssets[];
   pdfs: IAssets[];
   videos: IVideoFormCurrent[];
}

export interface IPostResources {
   coverImage?: string | File;
   images: File[];
   pdfs: File[];
   videos: IVideoForm[];
}

export interface IPostForm extends IPostRequest {
   coverImage?: string | File;
   images: File[];
   pdfs: File[];
   videos: IVideoForm[];
}

export interface IVideoFormCurrent extends IVideoForm {
   id: number;
}

export interface IVideoForm {
   title: string;
   url: string;
}

export interface IAssets {
   id: number;
   name: string;
   type: string;
   title?: string;
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
