import AdditionalInfo from '@/components/TourDetail/AdditionalInfo';
import ImportantInfo from '@/components/TourDetail/ImportantInfo';
import Itinerary from '@/components/TourDetail/Itinerary';
import Schedule from '@/components/TourDetail/Schedule';
import TourCard from '@/components/TourDetail/TourCard';
import TourDetailCard from '@/components/TourDetail/TourDetailCard';
import TourImages from '@/components/TourDetail/TourImage';
import { Row, Col, Typography } from 'antd';

import img from '../assets/slide_cb_0_tuiblue-3.webp';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRandom3Tour, getTourById } from '@/services/tourServices';
import type { ITour } from '@/types/Tour';
import Comment from '@/components/Comment/Comment';


const { Title } = Typography;

const tours = [
  {
    id: 1,
    imageUrl: img,
    name: 'Từ Cố Đô Hoa Lư về đất Thăng Long | Hà Nội - Ninh Bình - Hạ Long',
    departureLocation: 'TP. Hồ Chí Minh',
    code: 'XV2SGN',
    price: 11590000,
    attractions: [
      'Núi Yên Tử',
      'Chùa Bái Đính',
      'Tràng An',
      'Yên Tử',
      'Ninh Bình',
      'Vịnh Hạ Long',
      'Hà Nội',
    ],
    duration: '4N3Đ',
    transport: 'Máy bay',
  },
];

export default function TourDetail() {
  const [dataDetailtour, setDataDetailTour] = useState<ITour | null>(null);
  const [dataRandomTour, setDataRandomTour] = useState<ITour[]>([]);
  const [selectedDepartureId, setSelectedDepartureId] = useState<number | null>(null);
  const { id } = useParams<{ id: string }>();

  const fetchDataTourById = async () => {
    if (!id) return;
    try {
      const res = await getTourById(Number(id));
      if (res.code==1000){
        setDataDetailTour(res.result);
      }
      
    } catch (error) {
      console.error("Failed to fetch tour:", error);
    }
  };

  const fetchRandomTourData = async () => {
    try {
      const res = await getRandom3Tour();
      if (res.code==1000){
        setDataRandomTour(res.result);
      }
      
    } catch (error) {
      console.error("Failed to fetch tour:", error);
    }
  };

  useEffect(() => {
    fetchDataTourById();
  }, [id]);

  useEffect(() => {
      fetchRandomTourData();
  }, []);

  const handleSelectDeparture = (departureId: number | null) => {
    setSelectedDepartureId(departureId);
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <Row justify="center">
        <Col xs={24} md={22} lg={22} xl={20} xxl={16}>
          <Title level={4} style={{ marginBottom: 24, fontWeight: 700, padding: '0 12px' }}>
            {dataDetailtour?.tourTitle}
          </Title>

          <Row gutter={24}>
            <Col span={17}>
              {dataDetailtour && <TourImages imageIds={dataDetailtour.imageIds} />}
              {dataDetailtour && <Schedule tourData={dataDetailtour} onSelectDepartureId={handleSelectDeparture}/>}
              <AdditionalInfo />
              <Itinerary tourId={dataDetailtour?.id}/>
              <ImportantInfo />
            </Col>

            <Col span={7}>
              <div
                style={{
                  position: 'sticky',
                  top: 24,
                  alignSelf: 'flex-start', // đảm bảo sticky tính từ đầu Col
                }}
              >
                <TourDetailCard tourData={dataDetailtour} selectedDepartureId={selectedDepartureId}/>
              </div>
            </Col>
          </Row>
          <Comment />
          <Title
            level={3}
            style={{
              marginTop: 48,
              marginBottom: 24,
              fontWeight: 700,
              textAlign: 'center',
              color: '#0B5DA7',
            }}
          >
            CÁC CHƯƠNG TRÌNH KHÁC
          </Title>

          <Row gutter={24} justify="space-between">
            {dataRandomTour.map((tour) => (
              <Col key={tour.id} span={8}>
                <TourCard tour={tour} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}