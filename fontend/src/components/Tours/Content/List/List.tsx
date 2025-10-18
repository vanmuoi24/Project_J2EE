import { useState } from 'react';
import { Card, Pagination, Button, Tag, Space, Typography } from 'antd';
import {
  CalendarOutlined,
  EnvironmentOutlined,
  CarOutlined,
  SendOutlined,
  ClockCircleFilled,
  ClockCircleOutlined,
} from '@ant-design/icons';
import type { ITour } from '@/types/Tour';
import { formatCurrencyVND } from '@/utils';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

// Dữ liệu giả lập cho 15 tour
const fakeTours: ITour[] = Array.from({ length: 15 }, (_, i) => {
  const destinations = [
    { city: 'Bangkok', type: 'international' },
    { city: 'Seoul', type: 'international' },
    { city: 'Tokyo', type: 'international' },
    { city: 'Đà Nẵng', type: 'domestic' },
    { city: 'Singapore', type: 'international' },
    { city: 'Phú Quốc', type: 'domestic' },
  ];
  const departures = [
    { city: 'TP. Hồ Chí Minh', type: 'domestic' },
    { city: 'Hà Nội', type: 'domestic' },
  ];
  const vehicles = [
    { id: 'plane', name: 'Máy bay' },
    { id: 'bus', name: 'Xe' },
  ];
  const currentDest = destinations[i % destinations.length];

  return {
    id: i + 1,
    tourTitle: `Khám phá ${currentDest.city} ${(i % 4) + 4} ngày ${(i % 4) + 3} đêm`,
    tourProgram: 'Chương trình tham quan hấp dẫn với nhiều điểm đến nổi tiếng.',
    description: `Một chuyến đi tuyệt vời đến ${currentDest.city}, nơi bạn có thể khám phá văn hóa độc đáo, ẩm thực phong phú và cảnh quan tuyệt đẹp.`,
    duration: (i % 4) + 4,
    basePrice: 5000000 + i * 1500000,
    imageIds: [
      `https://placehold.co/600x400/5B92E5/FFFFFF?text=Tour+${currentDest.city.replace(' ', '+')}`,
    ],
    departureCity: departures[i % departures.length],
    destinationCity: currentDest,
    tourPrice: {
      id: i + 1,
      adultPrice: 5000000 + i * 1500000,
      childPrice: 4000000 + i * 1200000,
      infantPrice: 1000000,
      toddlerPrice: 500000,
      singleSupplementPrice: 1500000,
    },
    vehicle: vehicles[i % vehicles.length],
  };
});

const PAGE_SIZE = 10;

const List = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedTours = fakeTours.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Title level={2} className="text-center mb-8">
          Danh sách Tour nổi bật
        </Title>
        <div className="flex flex-col gap-5 max-h-[600px] overflow-y-auto !pr-4">
          {paginatedTours.map((tour) => (
            <Card
              key={tour.id}
              hoverable
              className="shadow-lg rounded-lg overflow-hidden"
              bodyStyle={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}
            >
              <div className="flex flex-row gap-4">
                <div className="w-1/3 flex-shrink-0 rounded-lg overflow-hidden">
                  <img
                    alt={tour.tourTitle}
                    src={tour.imageIds[0]}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col h-full">
                  <div className="!mb-6">
                    <span className="font-[700] text-[20px]">{tour.tourTitle}</span>
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <span>
                      <span className="!mr-2">
                        <EnvironmentOutlined className="!mr-1" />
                        Khởi hành:
                      </span>
                      <span className="font-[700]">{tour.departureCity.city}</span>
                    </span>
                    <Space size="middle" className=" mb-4">
                      <span>
                        <span className="!mr-2">
                          <ClockCircleOutlined className="!mr-1" />
                          Thời gian:
                        </span>

                        <span className="font-[700]">{tour.duration} ngày</span>
                      </span>
                      <Text>
                        <span>
                          <span className="!mr-2">
                            {tour.vehicle.name === 'Máy bay' ? (
                              <SendOutlined className="!mr-1" />
                            ) : (
                              <CarOutlined className="!mr-1" />
                            )}
                            Phương tiện:
                          </span>

                          <span className="font-[700]"> {tour.vehicle.name}</span>
                        </span>
                      </Text>
                    </Space>
                    <span>
                      <span className="!mr-2">
                        <CalendarOutlined className="!mr-1" />
                        Ngày khởi hành:
                      </span>
                      <span className="font-[700]"> {tour.vehicle.name}</span>
                    </span>
                  </div>
                  <div className="!mt-4 flex justify-between items-center">
                    <div className="">
                      <Text className="text-gray-500">Giá chỉ từ</Text>
                      <span className="block text-[#e10600] !mt-0 font-[700] text-[22px]">
                        {formatCurrencyVND(tour.basePrice)}
                      </span>
                    </div>
                    <Button
                      onClick={() => {
                        navigate(`detail/${tour.id}`);
                      }}
                      type="primary"
                      className="mt-2"
                      size="large"
                    >
                      Xem chi tiết
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center !mt-8 !mb-[80px]">
          <Pagination
            current={currentPage}
            pageSize={PAGE_SIZE}
            total={fakeTours.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
};

export default List;
