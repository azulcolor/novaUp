import { IPostRequest } from '@/interfaces';

export const serializedPostUpdate = (data: IPostRequest) => ({
   id: data.id,
   category: data.category,
   assets: data.assets || [],
   isPinned: data?.type?.includes('Convocatoria')
      ? data.isPinned || false
      : false || false,
   title: data.title,
   description: data.description,
   summary: data.summary,
   publishDate: data.publishDate || new Date().toISOString(),
   eventDate: data.eventDate || new Date().toISOString(),
   isApproved: data.isApproved || false,
   type: data.type,
   tags: data.tags || '',
   comments: data.comments || '',
});

export const serializedNewPost = (data: IPostRequest) => ({
   categoryId: data.category.id,
   assets: data.assets || [],
   title: data.title,
   description: data.description,
   summary: data.summary,
   publishDate: data.publishDate || new Date().toISOString(),
   eventDate: data.eventDate || new Date().toISOString(),
   isApproved: data.isApproved || false,
   type: data.type,
   tags: data.tags || '',
   comments: data.comments || '',
});
