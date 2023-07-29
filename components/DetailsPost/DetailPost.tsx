import { IPost } from '@/interfaces';
import ImagesDetail from './Images';

interface Props {
   post: IPost;
}

export default function PostDetail({ post }: Props) {
   return (
      <>
         <div className="flex flex-row">
            <div className="flex flex-col p-4 w-3/5">
               <div className="text-3xl font-semibold mb-8 mt-2">
                  <p>{post.title}</p>
               </div>
               <div className="text-neutral-500 text-base">
                  <p>{post.description}</p>
               </div>
            </div>
            <ImagesDetail post={post} />
         </div>
         <div className="pt-8 flex justify-center">
            <iframe
               className="h-60 md:w-1/2 lg:w-1/2 lg:h-96"
               width="800"
               height="487"
               src="https://www.youtube.com/embed/zaKnUdYUCHM"
               title="YouTube video player"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
         </div>
      </>
   );
}
