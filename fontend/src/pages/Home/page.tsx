import Banner from '@/components/Home/Banner/Banner';
import Explore from '@/components/Home/Explore/Explore';
import PopularTours from '@/components/Home/PopularTours/PopularTours';
import Highlights from '@/components/Home/Highlights/Highlights';
import Slide from '@/components/Home/Slide/Slide';
import Rating from '@/components/Home/Rating/Rating';

const HomePage = () => {
  return (
    <>
      <Banner />
      <Slide />
      <Explore />
      <PopularTours />
      <Rating />
      <Highlights />
    </>
  );
};

export default HomePage;
