import { Card } from '@/components/common/Card';
import { apiRequest } from '@/libs/axios-api';
import Carousel from '@/components/common/Carousel';
import { ImageComponent } from '@/components/common/ImageComponent';
import { CustomButton } from '@/components/CustomInputs/CustomButton';
import Link from 'next/link';

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
         <div className="flex p-6">
            <div className="w-1/2">
               <ImageComponent
                  src="/assets/images/search-categories.png"
                  w={500}
                  h={300}
                  containerStyles="flex justify-center items-center"
               />
            </div>
            <div className="flex flex-col justify-center items-start w-1/2">
               <h1 className="text-3xl pb-6">¿Estás buscando algo en específico?</h1>
               <p className="text-lg pb-16">
                  Ven a ver todas las noticias que tenemos para ti.
               </p>
               <Link href="/posts" className="btn btn-primary flex justify-center">
                  <span>Ver categorias</span>
               </Link>
            </div>
         </div>
      </div>
   );
}
