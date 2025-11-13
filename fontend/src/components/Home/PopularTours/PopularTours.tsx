// @/components/PopularTours.tsx (File component chính của bạn)

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Container from '@/components/Share/Container';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Empty } from 'antd'; //
import { useEffect, useState, useMemo, useCallback } from 'react';
import { getAllTours } from '@/services/tourServices';
import type { ITour } from '@/types/Tour';
import { useNavigate } from 'react-router-dom';
import TourCard from './TourCard'; //

interface CustomArrowProps {
  onClick?: () => void;
  direction: 'prev' | 'next';
}

const CustomArrow: React.FC<CustomArrowProps> = ({ onClick, direction }) => {
  // ... (Code CustomArrow của bạn giữ nguyên)
  const isPrev = direction === 'prev';
  return (
    <div
      onClick={onClick}
      className={`
        absolute top-[40%] -translate-y-1/2 z-10
        flex items-center justify-center
        w-12 h-12 bg-white rounded-full shadow-lg
        text-3xl text-[#0b5da7] cursor-pointer
        transition-transform hover:scale-110
        ${isPrev ? 'left-[-40px]' : 'right-[-40px]'}
      `}
    >
      {isPrev ? <LeftOutlined /> : <RightOutlined />}
    </div>
  );
};

const PopularTours = () => {
  // 🌟 TỐI ƯU 5: Thêm state cho Loading và Error
  const [tours, setTours] = useState<ITour[]>([]);

  const navigate = useNavigate();

  const getTours = useCallback(async () => {
    const res = await getAllTours();
    if (res.code === 1000) {
      setTours(res.result.slice(0, 6));
    }
  }, []);

  useEffect(() => {
    getTours();
  }, [getTours]);

  const handleBooking = useCallback(
    (id: number) => {
      navigate(`tours/detail/${id}`);
    },
    [navigate] // Dependency là navigate
  );

  const handleViewMore = useCallback(() => {
    navigate('/tours');
  }, [navigate]);

  const settings = useMemo(
    () => ({
      dots: true,
      infinite: tours.length > 3, // Chỉ infinite nếu có đủ slide
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      swipe: false,
      draggable: false,
      nextArrow: <CustomArrow direction="next" />,
      prevArrow: <CustomArrow direction="prev" />,
      // Thêm responsive để đẹp hơn trên mobile
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: tours.length > 2,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: tours.length > 1,
            arrows: false, // Ẩn mũi tên trên mobile cho gọn
          },
        },
      ],
    }),
    [tours.length] // Chỉ tính toán lại khi số lượng tour thay đổi
  );

  // 🌟 TỐI ƯU 9: Tách logic render nội dung slider
  const renderSliderContent = () => {
    if (!tours || tours.length === 0) {
      return <Empty description="No popular tours found at this moment." />;
    }

    return (
      <Slider {...settings}>
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} onBooking={handleBooking} />
        ))}
      </Slider>
    );
  };

  return (
<<<<<<< HEAD
    <div className="!mb-20 bg-[#dcefff] !py-[30px] !px-0">
      <Container>
        <div className="!mb-[12px]">
          <h2 className="text-[32px] font-[700] uppercase text-[#0b5da7] !mb-0">Popular Tours</h2>
          <div className="w-[60px] h-[4px] bg-[#0b5da7] rounded-[2px]" />
        </div>

        <p className="text-[20px] text-[#444] !mb-[24px] max-w-[720px]">
          Explore our top-rated tours and find inspiration for your next journey.
        </p>

        {/* Gọi hàm render nội dung */}
        {renderSliderContent()}
=======
    <div className="!mb-20 bg-gradient-to-r from-[#7dadb0] to-[#ddb5fc] !py-[30px] !px-0">
      <Container>
        <div className="!mb-[12px] flex flex-col items-center">
          <h2 className="text-[32px] font-bold text-center uppercase text-[#fff] !mb-0">
            CHUYẾN ĐI HẤP DẪN
          </h2>
          <div className="w-[200px] h-[4px] bg-[#FFDA32] rounded-[2px]" />
        </div>
        <div className="flex justify-center">
          <p className="text-[18px] text-center text-[#666] !mb-[24px] max-w-[720px]">
            Khám phá các chuyến tham quan được xếp hạng hàng đầu của chúng tôi và tìm nguồn cảm hứng
            cho hành trình tiếp theo của bạn.
          </p>
        </div>
        <div className="!mt-[40px]">
          {/* Gọi hàm render nội dung */}
          {renderSliderContent()}
        </div>
>>>>>>> fb6f375982862f5228192db8537ae277ed7c4604

        <div className="text-center !mt-[32px]">
          <Button
            type="primary"
            size="large"
<<<<<<< HEAD
            className="bg-[#0b5da7] border-[#0b5da7] rounded-[8px] !py-0 !px-[32px] h-[48px] text-[16px] font-[600]"
=======
            className="!bg-[#7BBCB0] rounded-[8px] !py-0 !px-[32px] h-[48px] text-[16px] !font-bold"
>>>>>>> fb6f375982862f5228192db8537ae277ed7c4604
            onClick={handleViewMore}
          >
            View more
          </Button>
        </div>
      </Container>
    </div>
  );
};

<<<<<<< HEAD
export default PopularTours;
=======
export default PopularTours;
>>>>>>> fb6f375982862f5228192db8537ae277ed7c4604
