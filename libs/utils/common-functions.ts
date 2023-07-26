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
