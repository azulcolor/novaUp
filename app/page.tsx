import Card from "@/components/common/Card"
import { apiRequest } from "@/libs/axios-api";
import Carousel from "@/components/common/Carousel";
import { IPost } from "@/interfaces";
import CarouselCard from "@/components/common/CardCarousel";
interface Props {
  latests: IPost[];
}

export default async function Home(props: Props) {
  const posts = await apiRequest.getPosts('');
  const latests = await apiRequest.getPosts('');
  console.log(posts);
  return (
    <main className="">
      <div className='carousel'>
        <Carousel items={latests}/>
      </div>
      <div className='bottom__layer'>
      </div>
    </main>
  )
}
