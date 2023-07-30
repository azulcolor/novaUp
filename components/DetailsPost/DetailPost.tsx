import { IPost } from '@/interfaces';
import ImagesDetail from './Images';

interface Props {
   post: IPost;
}

export default function PostDetail({ post }: Props) {
   return (
      <>
         <div className="flex flex-col lg:flex-row">
            <div className="flex-col p-4 basis-2/3">
               <p className="text-4xl font-semibold mb-8 mt-2">{post.title}</p>
               <p className=" pr-12 text-neutral-500 text-lg whitespace-pre-line">
                  {post.description}
               </p>
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
