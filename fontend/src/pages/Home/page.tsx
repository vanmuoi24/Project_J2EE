import Banner from '@/components/Home/Banner/Banner';
import Explore from '@/components/Home/Explore/Explore';
import PopularTours from '@/components/Home/PopularTours/PopularTours';
import Highlights from '@/components/Home/Highlights/Highlights';
import Slide from '@/components/Home/Slide/Slide';
import Achievements from '@/components/Home/Highlights/Achievement';

const HomePage = () => {
  return (
    <>
      <Banner />
      <Slide />
      <Explore />
      <PopularTours />
      <Highlights />
      <Achievements />
    </>
  );
};

export default HomePage;