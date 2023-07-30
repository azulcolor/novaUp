export const apiGoogle = {
   getYoutubeSnippet: async (id: string) => {
      return await fetch(
         `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=snippet&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
      )
         .then((res) => res.json())
         .then((data) => data)
         .catch((e) => {
            console.log(e);
            false;
         });
   },
};
