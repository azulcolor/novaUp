import { IPostForm, IPostRequest, IPostResources } from '@/interfaces';

export const serializedNewPost = (data: IPostForm) => {
   const baseObject = {
      categoryId: data.category.id,
      title: data.title,
      description: data.description,
      summary: data.summary,
      type: data?.typeSelect?.name || 'Convocatoria interna',
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

export const serializedPostUpdate = (data: IPostRequest) => {
   const baseObject = {
      categoryId: data.category.id,
      title: data.title,
      description: data.description,
      summary: data.summary,
      type: data.type,
      tags: data?.tagsList?.join(',') || data.tags,
      comments: data.comments || '',
   };
   return data.eventDate
      ? {
           ...baseObject,
           eventDate: data.eventDate,
        }
      : baseObject;
};

export const serializedAssetsByPost = (data: IPostResources) => ({
   links: data.videos.map((video) => video.url).join(','),
   files: [...data.images, ...data.pdfs],
   coverImageFile: data.coverImage,
});
