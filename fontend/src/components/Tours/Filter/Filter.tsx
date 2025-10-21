import { useEffect, useState } from 'react';
import { Select, Radio, DatePicker, Button, Checkbox, Space, Typography } from 'antd';
import type { RadioChangeEvent } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { getAllDepartures, getAllDestinations, getAllVehicles } from '@/services/tourServices';
import type { IDeparture, IDestination } from '@/types/Tour';

// Cấu hình tiếng Việt cho Dayjs
dayjs.locale('vi');

const { Text } = Typography;

const departureLocations = [
  { id: 1, city: 'Tất cả' },
  { id: 2, city: 'TP. Hồ Chí Minh' },
  { id: 3, city: 'Hà Nội' },
  { id: 4, city: 'Đà Nẵng' },
];

const destinations = [
  { id: 1, city: 'Thái Lan' },
  { id: 2, city: 'Singapore' },
  { id: 3, city: 'Hàn Quốc' },
  { id: 4, city: 'Nhật Bản' },
];

const transportations = ['Xe', 'Máy bay'];

const Filter = () => {
  // State để lưu trữ các giá trị của bộ lọc
  const [budget, setBudget] = useState<number | null>(null);
  const [departure, setDeparture] = useState<IDeparture[] | null>(null);
  const [destination, setDestination] = useState<IDestination[] | null>();
  const [departureDate, setDepartureDate] = useState<Dayjs | null>(dayjs('2025-10-17'));
  const [selectedTransports, setSelectedTransports] = useState([]);

  // Hàm xử lý khi nhấn nút "Áp dụng"
  const handleApplyFilters = () => {
    const filters = {
      budget,
      departure,
      destination,
      departureDate: departureDate ? departureDate.format('YYYY-MM-DD') : null,
      transportation: selectedTransports,
    };
    console.log('Đã áp dụng các bộ lọc:', filters);
  };

  const getAllData = async () => {
    /**
     * Gọi đồng thời cả 3 API và chờ tất cả hoàn thành.
     */
    const [departures, destinations, vehicles] = await Promise.all([
      getAllDepartures(),
      getAllDestinations(),
      getAllVehicles(),
    ]);

    return { departures, destinations, vehicles };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Bắt đầu tải dữ liệu...');
        const data = await getAllData();

        setDeparture(data.departures);
        setDestination(data.destinations);
        setSelectedTransports(data.vehicles);

        console.log('Tải dữ liệu thành công:', data);
      } catch (error) {
        // Đừng quên xử lý lỗi
        console.error('Đã xảy ra lỗi khi tải dữ liệu:', error);
      }
    };

    // Gọi hàm vừa tạo
    fetchData();
  }, []);

  return (
    <div className="!p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <Space direction="vertical" size="large" className="w-full">
        {/* Ngân sách */}

        {/* Điểm khởi hành & Điểm đến */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <Text strong className="!mb-2">
              Ngân sách
            </Text>
            <Radio.Group
              onChange={(e: RadioChangeEvent) => setBudget(e.target.value)}
              value={budget}
              className="mt-2"
            >
              <Space direction="vertical">
                <Radio value={1}>Dưới 5 triệu</Radio>
                <Radio value={2}>Từ 5 - 10 triệu</Radio>
                <Radio value={3}>Từ 10 - 20 triệu</Radio>
                <Radio value={4}>Trên 20 triệu</Radio>
              </Space>
            </Radio.Group>
          </div>

          <div className="flex flex-col">
            <Text strong className="!mb-2">
              Điểm khởi hành
            </Text>
            <Select
              className="w-full !mt-2 "
              value={departure}
              onChange={(value) => setDeparture(value)}
              options={departureLocations}
              fieldNames={{ label: 'city', value: 'id' }}
            />
          </div>
          <div className="flex flex-col">
            <Text strong className="!mb-2">
              Điểm đến
            </Text>
            <Select
              className="w-full mt-2"
              value={destination}
              onChange={(value) => setDestination(value)}
              options={destinations}
              fieldNames={{ label: 'city', value: 'id' }}
            />
          </div>
          {/* Ngày đi */}
          <div className="flex flex-col">
            <Text strong className="!mb-2">
              Ngày đi
            </Text>
            <DatePicker
              className="w-full mt-2"
              value={departureDate}
              onChange={(date) => setDepartureDate(date)}
              format="dd, DD MMMM, YYYY"
              placeholder="Chọn ngày đi"
            />
          </div>
          {/* Phương tiện */}
          <div className="flex flex-col">
            <Text strong className="!mb-2">
              Phương tiện
            </Text>
            <Checkbox.Group
              options={transportations}
              value={selectedTransports}
              onChange={(checkedValues) => setSelectedTransports(checkedValues)}
              className="mt-2"
            />
          </div>
        </div>

        {/* Nút Áp dụng */}
        <Button type="primary" size="large" className="w-full !mt-4" onClick={handleApplyFilters}>
          Áp dụng
        </Button>
      </Space>
    </div>
  );
};

export default Filter;
