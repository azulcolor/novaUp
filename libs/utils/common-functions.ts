import { IAssets } from '@/interfaces';
import { apiRequest } from '../axios-api';

// search functional received array u object and string to search and return array with items that match the search
export const handlesearchItems = (items: any[], searchText: string) => {
   const words = searchText.toLowerCase().split(' ');

   if (!items) return items;

   return items?.filter((item) => {
      const sanitizedItem = JSON.stringify(item)
         .normalize('NFD')
         .replace(/[\u0300-\u036f]/g, '')
         .toLowerCase();

      const punctuationRemovedItem = sanitizedItem.replace(
         /[.,\/#!$%\^&\*;:{}=\-_`~()"]/g,
         ' '
      );

      return words.some((word) => {
         const sanitizedWord = word
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();

         const punctuationRemovedWord = sanitizedWord.replace(
            /[.,\/#!$%\^&\*;:{}=\-_`~()"]/g,
            ''
         );

         return punctuationRemovedItem.includes(punctuationRemovedWord);
      });
   });
};

export const getTitleVideos = async (videos: IAssets[]) =>
   await videos.map(async (video, index) => {
      const urlMatch = video.name.match(/src="([^"]+)"/);

      if (urlMatch) {
         const url = urlMatch[1];
         const parts = url?.split('/');
         const videoId = parts[parts?.length - 1];

         const snipeds = await apiRequest.getYoutubeSnippet(videoId);
         const title = snipeds?.items[0]?.snippet?.title;
         return {
            ...video,
            title,
         };
      }
      return {
         ...video,
         title: `Video ${index + 1}`,
      };
   });
