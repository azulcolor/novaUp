import { IPost } from '@/interfaces';
import Image from 'next/image';

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
                  <p>{post.description}</p>
               </div>
            </div>
            <div className="p-4 flex flex-col">
               <div className="">
                  <Image
                     className="rounded-2xl h-full w-full"
                     src={post.coverImage || '/assets/images/logo.png'}
                     alt="logo"
                     width={689}
                     height={487}
                  />
               </div>
               <div className="flex flex-row">
                  <Image
                     className="rounded-2xl"
                     src="https://via.placeholder.com/150x106"
                     alt="other image"
                     width={150}
                     height={106}
                  />
                  <Image
                     className="rounded-2xl"
                     src="https://via.placeholder.com/150x106"
                     alt="other image"
                     width={150}
                     height={106}
                  />
                  <Image
                     className="rounded-2xl"
                     src="https://via.placeholder.com/150x106"
                     alt="other image"
                     width={150}
                     height={106}
                  />
                  <Image
                     className="rounded-2xl"
                     src="https://via.placeholder.com/150x106"
                     alt="other image"
                     width={150}
                     height={106}
                  />
               </div>
            </div>
         </div>
      </>
   );
}
