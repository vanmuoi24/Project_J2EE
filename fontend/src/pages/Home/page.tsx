import Banner from '@/components/Home/Banner/Banner';
import Explore from '@/components/Home/Explore/Explore';
import LastHouse from '@/components/Home/LastHouse/LastHouse';
import Highlights from '@/components/Home/Highlights/Highlights';
import Slide from '@/components/Home/Slide/Slide';
import Achievements from '@/components/Home/Highlights/Achievement';

const HomePage = () => {
  return (
    <>
      <Banner />
      <Slide />
      <Explore />
      <LastHouse />
      <Highlights />
      <Achievements />
    </>
  );
};

export default HomePage;
