import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Container from '@/components/Share/Container';
import {
  EnvironmentOutlined,
  CalendarOutlined,
  FieldTimeOutlined,
  NumberOutlined,
  ClockCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { getAllTours } from '@/services/tourServices';
import type { ITour } from '@/types/Tour';
import dayjs from 'dayjs';
import { formatCurrencyVND } from '@/utils';
import { useNavigate } from 'react-router-dom';

const NextArrow = (props: React.ComponentPropsWithoutRef<'div'> & { onClick?: () => void }) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        right: -40,
        top: '40%',
        transform: 'translateY(-50%)',
        fontSize: 28,
        color: '#0b5da7',
        cursor: 'pointer',
        background: '#fff',
        borderRadius: '50%',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
      }}
    >
      <RightOutlined />
    </div>
  );
};

const PrevArrow = (props: React.ComponentPropsWithoutRef<'div'> & { onClick?: () => void }) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        left: -40,
        top: '40%',
        transform: 'translateY(-50%)',
        fontSize: 28,
        color: '#0b5da7',
        cursor: 'pointer',
        background: '#fff',
        borderRadius: '50%',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
      }}
    >
      <LeftOutlined />
    </div>
  );
};

const LastHouse = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipe: false,
    draggable: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const [tours, setTours] = useState<ITour[]>([]);
  const nava = useNavigate();
  // const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});
  const getTours = async () => {
    const res = await getAllTours();
    if (res.code === 1000) {
      setTours(res.result);
    } else {
      setTours([]);
    }
  };
  useEffect(() => {
    getTours();
  }, []);

  const handleBooking = (id: number) => {
    nava(`/detail/${id}`);
  };
  // Countdown xử lý
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const updated: { [key: string]: string } = {};
  //     deals.forEach((deal) => {
  //       const diff = deal.saleEnd - new Date().getTime();
  //       if (diff > 0) {
  //         const hours = Math.floor(diff / (1000 * 60 * 60));
  //         const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  //         const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  //         updated[deal.id] = `${hours}h ${minutes}m ${seconds}s`;
  //       } else {
  //         updated[deal.id] = "Hết hạn";
  //       }
  //     });
  //     setTimeLeft(updated);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);
  return (
    <div
      className="!mb-20"
      style={{
        background: '#dcefff',
        padding: '30px 0',
      }}
    >
      <Container>
        <div style={{ marginBottom: 12 }}>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#0b5da7',
              marginBottom: 8,
            }}
          >
            Last-Minute Deals
          </h2>
          <div
            style={{
              width: 60,
              height: 4,
              backgroundColor: '#0b5da7',
              borderRadius: 2,
            }}
          />
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: 20,
            lineHeight: 1.6,
            color: '#444',
            marginBottom: 24,
            maxWidth: 720,
          }}
        >
          Act fast and seize the final discount—book now before it’s gone!
        </p>

        <Slider {...settings}>
          {tours &&
            tours.map((tour) => (
              <div key={tour.id} style={{ padding: '0 8px' }}>
                <div
                  style={{
                    border: '1px solid #eee',
                    borderRadius: 12,
                    overflow: 'hidden',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    width: '97%',
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <img
                      src={tour.imageIds[0]}
                      alt={tour.tourProgram}
                      style={{ width: '100%', height: 200, objectFit: 'cover' }}
                    />
                    {/* Countdown sale */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: 'rgba(255,0,0,0.8)',
                        color: '#fff',
                        padding: '4px 10px',
                        borderRadius: 6,
                        fontWeight: 'bold',
                        fontSize: 14,
                      }}
                    >
                      <ClockCircleOutlined style={{ marginRight: 4 }} />
                      {'...'}
                      {/* {để thời gian discount}  */}
                    </div>
                  </div>

                  <div style={{ padding: '16px' }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                      {tour.tourTitle}
                    </h3>
                    <p style={{ margin: '4px 0' }}>
                      <NumberOutlined /> <b>ID:</b> {tour.id}
                    </p>
                    <p style={{ margin: '4px 0' }}>
                      <EnvironmentOutlined /> <b>Departs from:</b> {tour.departureCity.city}
                    </p>
                    <p style={{ margin: '4px 0' }}>
                      {/* <CalendarOutlined /> <b>Departure dates:</b> {tour.date} */}
                      <CalendarOutlined /> <b>Departure dates:</b> {dayjs().format('DD/MM/YYYY')}
                    </p>
                    <p style={{ margin: '4px 0' }}>
                      <FieldTimeOutlined /> <b>Duration:</b> {tour.duration}
                    </p>
                    {/* <p style={{ margin: "4px 0" }}>
                  <TeamOutlined /> <b>Remaining seats:</b> {tour.seats}
                </p> */}

                    {/* Price + Booking */}
                    <div
                      style={{
                        marginTop: 12,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          color: '#e63946',
                        }}
                      >
                        {formatCurrencyVND(tour.basePrice)}
                      </span>
                      <Button type="primary" onClick={() => handleBooking(tour.id)}>
                        Booking
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Button
            type="primary"
            size="large"
            style={{
              backgroundColor: '#0b5da7',
              borderColor: '#0b5da7',
              borderRadius: 8,
              padding: '0 32px',
              height: 48,
              fontSize: 16,
              fontWeight: 600,
            }}
            // onClick={Navigate('/deals')}
            onClick={() => alert('sẽ chuyển sang route /deals')}
          >
            View All Deals
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default LastHouse;
