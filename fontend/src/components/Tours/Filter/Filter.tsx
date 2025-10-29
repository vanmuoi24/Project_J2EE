import { useEffect, useState } from 'react';
import { Select, Radio, DatePicker, Button, Checkbox, Space, Typography } from 'antd';
import type { RadioChangeEvent } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { getAllDepartures, getAllDestinations, getAllVehicles } from '@/services/tourServices';
import type { IDeparture, IDestination, ITour, IVehicle } from '@/types/Tour';

dayjs.locale('vi');

const { Text } = Typography;

const Filter = (tours: { tours: ITour[] | null }) => {
  // State để lưu trữ các giá trị của bộ lọc
  const [budget, setBudget] = useState<string | null>(null);
  const [departure, setDeparture] = useState<IDeparture[] | null>(null);
  const [destination, setDestination] = useState<IDestination[] | null>(null);
  const [vehicles, setVehicles] = useState<IVehicle[] | null>(null);
  const [departureDate, setDepartureDate] = useState<Dayjs | null>(dayjs());

  const [selectedTransports, setSelectedTransports] = useState<string[] | null>(null);
  const [selectedDeparture, setSelectedDeparture] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);

  const handleApplyFilters = () => {
    const filters = {
      budget,
      selectedDeparture,
      selectedDestination,
      departureDate: departureDate ? departureDate.format('YYYY-MM-DD') : null,
      transportation: selectedTransports,
    };
    console.log('Đã áp dụng các bộ lọc:', filters);
  };

  const getAllData = async () => {
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
        const data = await getAllData();

        setDeparture(data.departures.result);
        setDestination(data.destinations.result);
        setVehicles(data.vehicles.result);

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
                <Radio value={null}>Không giới hạn</Radio>
                <Radio value="<5">Dưới 5 triệu</Radio>
                <Radio value="5-10">Từ 5 - 10 triệu</Radio>
                <Radio value="10-20">Từ 10 - 20 triệu</Radio>
                <Radio value=">20">Trên 20 triệu</Radio>
              </Space>
            </Radio.Group>
          </div>

          <div className="flex flex-col">
            <Text strong className="!mb-2">
              Điểm khởi hành
            </Text>
            <Select
              className="w-full !mt-2 "
              value={selectedDeparture}
              onChange={(value) => setSelectedDeparture(value)}
              options={departure ?? undefined}
              fieldNames={{ label: 'city', value: 'city' }}
              placeholder="Tất cả"
              allowClear
            />
          </div>
          <div className="flex flex-col">
            <Text strong className="!mb-2">
              Điểm đến
            </Text>
            <Select
              className="w-full mt-2"
              value={selectedDestination}
              onChange={(value) => {
                setSelectedDestination(value);
              }}
              options={destination ?? undefined}
              fieldNames={{ label: 'city', value: 'city' }}
              placeholder="Tất cả"
              allowClear
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
              options={vehicles?.map((vehicle) => ({
                label: vehicle.name,
                value: vehicle.id,
              }))}
              value={selectedTransports ?? undefined}
              onChange={(checkedValues) => {
                setSelectedTransports(checkedValues as string[]);
              }}
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
