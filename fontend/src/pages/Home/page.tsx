import Banner from "@/components/Home/Banner/Banner"
import Explore from "@/components/Home/Explore/Explore"
import { LastHouse } from "@/components/Home/LastHouse/LastHouse"
import { PopularDest } from "@/components/Home/PopularDest/PopularDest"
import Slide from "@/components/Home/Slide/Slide"

const HomePage = () => {
  return (
    <>
      <Banner/>
      <Slide/>
      <Explore/>
      <LastHouse/>
      <PopularDest/>
    </>
  )
}

export default HomePage