import { Card, Button, Space, Typography } from 'antd';
import {
  CalendarOutlined,
  EnvironmentOutlined,
  CarOutlined,
  SendOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import type { ITour } from '@/types/Tour';
import { formatCurrencyVND } from '@/utils';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const List = ({ tours }: { tours: ITour[] | null }) => {
  const navigate = useNavigate();

  return (
    <div className="!p-4">
      <Title level={2} className="text-center mb-8">
        Danh sách Tour nổi bật
      </Title>
      <div className="flex flex-col gap-5 min-h-[600px] max-h-[600px] overflow-y-auto !pr-4">
        {tours?.map((tour) => (
          <Card key={tour.id} className="rounded-lg overflow-hidden flex-shrink-0">
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
        )) ?? <Text className="text-center !text-[18px]">Không có dữ liệu</Text>}
      </div>
    </div>
  );
};

export default List;
