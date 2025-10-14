import AdditionalInfo from '@/components/TourDetail/AdditionalInfo';
import ImportantInfo from '@/components/TourDetail/ImportantInfo';
import Itinerary from '@/components/TourDetail/Itinerary';
import Schedule from '@/components/TourDetail/Schedule';
import TourCard from '@/components/TourDetail/TourCardProps';
import TourDetailCard from '@/components/TourDetail/TourDetailCard';
import TourImages from '@/components/TourDetail/TourImage';
import { Row, Col, Typography } from 'antd';

import img from '../assets/slide_cb_0_tuiblue-3.webp';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTourById } from '@/services/tourServices';
import type { ITour, TourResponse } from '@/types/Tour';
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
  {
    id: 2,
    imageUrl: img,
    name: 'Hà Nội - Yên Tử - Vịnh Hạ Long - Ninh Bình - Chùa Bái Đính - KDL Tràng An',
    departureLocation: 'TP. Hồ Chí Minh',
    code: 'NDSGN1064',
    price: 7790000,
    attractions: ['Hồ Gươm', 'Lăng Bác', 'Chùa Một Cột', 'Yên Tử', 'Vịnh Hạ Long', 'Tràng An'],
    duration: '4N3Đ',
    transport: 'Máy bay',
  },
  {
    id: 3,
    imageUrl: img,
    name: 'Hà Nội - Sapa - Bản Cát Cát - Fansipan - Lào Cai - Tặng vé xe lửa Mường Hoa',
    departureLocation: 'TP. Hồ Chí Minh',
    code: 'NDSGN1965',
    price: 7290000,
    attractions: ['Fansipan', 'Bản Cát Cát', 'Thác Bạc', 'Cổng Trời', 'Nhà thờ Đá'],
    duration: '4N3Đ',
    transport: 'Máy bay',
  },
];

export default function TourDetail() {
  const [dataDetailtour, setDataDetailTour] = useState<ITour | null>(null);
  const [selectedDepartureId, setSelectedDepartureId] = useState<number | null>(null);
  const { id } = useParams<{ id: string }>();

  const fechDataTourById = async () => {
    const res = await getTourById(Number(id));
    const data: TourResponse = res;
    setDataDetailTour(data.result);
  };

  useEffect(() => {
    fechDataTourById();
  }, [id]);

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
              <TourImages />
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
            {tours.map((tour) => (
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
