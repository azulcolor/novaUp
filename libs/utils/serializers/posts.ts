import { IPostForm, IPostRequest } from '@/interfaces';

export const serializedNewPost = (data: IPostForm) => {
   const baseObject = {
      categoryId: data.category.id,
      title: data.title,
      description: data.description,
      summary: data.summary,
      type: data.type || 'Evento',
      tags: data?.tagsList?.join(',') || '',
      comments: data.comments || '',
      files: [...data.images, ...data.pdfs],
      coverImageFile: data.coverImage,
      links: data?.videos?.map((video) => video.url).join(',') || '',
   };

   return data.eventDate
      ? {
           ...baseObject,
           eventDate: data.eventDate,
        }
      : baseObject;
};

export const serializedPostUpdate = (data: IPostRequest) => ({
   id: data.id,
   category: data.category,
   assets: data.assets || [],
   title: data.title,
   description: data.description,
   summary: data.summary,
   publishDate: data.publishDate || new Date().toISOString(),
   eventDate: data.eventDate || new Date().toISOString(),
   type: data.type || 'Evento',
   tags: data.tags || '',
   comments: data.comments || '',
});
