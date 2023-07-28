import { Card } from '@/components/common/Card';
import { apiRequest } from '@/libs/axios-api';
import Carousel from '@/components/common/Carousel';
import { IPost } from '@/interfaces';
import CarouselCard from '@/components/common/CardCarousel';
interface Props {
   latests: IPost[];
}

export default async function Home(props: Props) {
   const latests = await apiRequest.getPostsLatest(5);
   const pinned = await apiRequest.getPostsPinned();

   const internalPosts = pinned.find((post) => post.type === 'Convocatoria interna');
   const externalPosts = pinned.find((post) => post.type === 'Convocatoria externa');

   console.log(pinned);
   return (
      <main className="">
         <div className="carousel">
            <Carousel items={latests as any} />
         </div>
         <div className="post-container">
            <div>
               {internalPosts && (
                  <Card key={`${internalPosts.id}-Internal`} post={internalPosts} />
               )}
            </div>
            <div>
               {externalPosts && (
                  <Card key={`${externalPosts.id}-External`} post={externalPosts} />
               )}
            </div>
         </div>
      </main>
   );
}
