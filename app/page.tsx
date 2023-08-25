import { Card } from '@/components/common/Card';
import { apiRequest } from '@/libs/axios-api';
import Carousel from '@/components/common/Carousel';

export default async function Home() {
   const latests = await apiRequest.getPostsLatest(5);
   const pinned = await apiRequest.getPostsPinned();

   const internalPosts = Array.isArray(pinned)
      ? pinned.find((post) => post.type === 'Convocatoria interna')
      : null;

   const externalPosts = Array.isArray(pinned)
      ? pinned.find((post) => post.type === 'Convocatoria externa')
      : null;

   return (
      <div>
         <div className="bg-[var(--background-dark)]">
            <Carousel items={(latests as any) || []} />
         </div>
         <div className="post-container">
            {internalPosts ? (
               <Card key={`${internalPosts.id}-Internal`} post={internalPosts} />
            ) : (
               <div></div>
            )}
            {externalPosts ? (
               <Card key={`${externalPosts.id}-External`} post={externalPosts} />
            ) : (
               <div></div>
            )}
         </div>
      </div>
   );
}
