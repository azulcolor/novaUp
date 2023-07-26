import Card from "@/components/common/Card"
import { api, apiRequest } from "@/libs/axios-api";
import Carousel from "@/components/common/Carousel";
import { IPost } from "@/interfaces";
import CarouselCard from "@/components/common/CardCarousel";
interface Props {
  latests: IPost[];
}

export default async function Home(props: Props) {
  const posts = await apiRequest.getPosts('');
  const latests = await apiRequest.getPostsLatest(5);
  const pinned = await apiRequest.getPostsPinned();

  console.log(posts);
  return (
    <main className="">
      <div className='carousel'>
        <Carousel items={latests} />
      </div>
      <div className='bottom__layer'>
        {pinned.length &&
          pinned.map((post: IPost, index: any) => (
            <Card key={`${post.id}-${index}`} post={post} />
          ))}
      </div>
    </main>
  )
}
