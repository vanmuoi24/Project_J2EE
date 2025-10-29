import { SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Divider, Flex, Input, Select, type SelectProps } from 'antd';
import type { DatePickerProps } from 'antd/lib';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Tours = () => {
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState(dayjs());
  const [priceRange, setPriceRange] = useState('under5'); // Lưu giá trị của Select

  const navigate = useNavigate();

  const onChangeDestination = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
  };

  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log('onChangeDate: ', date, dateString);
    if (date) {
      setDepartureDate(date);
    }
  };

  const onChangePrice: SelectProps['onChange'] = (value) => {
    console.log('onChangePrice: ', value);
    setPriceRange(value);
  };

  const dataRangePrices = [
    { value: 'under5', label: 'Dưới 5 triệu' },
    { value: '5to10', label: 'Từ 5 đến 10 triệu' },
    { value: '10to20', label: 'Từ 10 đến 20 triệu' },
    { value: 'over20', label: 'Trên 20 triệu' },
  ];

  const handleSearch = async () => {
    const params = new URLSearchParams();

    if (destination) {
      params.append('destinationLocation', destination);
    }

    if (departureDate) {
      params.append('departureDate', departureDate.format('YYYY-MM-DD'));
    }

    if (priceRange) {
      params.append('priceRange', priceRange);
    }

    params.append('page', '0'); // Bắt đầu từ trang 0
    params.append('size', '10'); // Lấy 10 kết quả

    navigate(`/tours?${params.toString()}`);
  };

  return (
    <div>
      <Flex vertical={false} className="p-2 md:px-3">
        {/* Where to travel */}
        <div className="flex-[4]">
          <p className="m-0 mb-1 text-[16px] font-medium">
            Where would you like to travel?
            <span className="text-red-500">*</span>
          </p>
          <Input
            value={destination} // <-- Kết nối
            onChange={onChangeDestination} // <-- Kết nối
            allowClear
            placeholder="e.g. Da Nang, Phu Quoc, Japan, South Korea, United States"
            variant="borderless"
            className="!p-0 text-[16px] font-medium"
          />
        </div>

        <Divider type="vertical" className="h-[70px] w-[1px] mx-3" />

        {/* Departure date */}
        <div className="flex-[3]">
          <p className="m-0 mb-1 text-[16px] font-medium">Departure date</p>
          <DatePicker
            format="dddd, DD/MM/YYYY"
            variant="borderless"
            className="!p-0 text-[18px] font-medium"
            suffixIcon=""
            itemScope
            value={departureDate} // <-- Kết nối
            onChange={onChangeDate} // <-- Kết nối
            defaultValue={dayjs()}
            inputReadOnly
          />
        </div>

        <Divider type="vertical" className="h-[70px] w-[1px] ml-3 mr-[11px]" />

        {/* Price range + button */}
        <div className="flex flex-[3] justify-between">
          <div>
            <p className="m-0 mb-1 text-[16px] font-medium pl-[11px]">Price range</p>
            <Select
              defaultValue="<5"
              variant="borderless"
              value={priceRange} // <-- Kết nối
              onChange={onChangePrice} // <-- Kết nối
              options={dataRangePrices}
              className="!w-[180px]"
            />
          </div>
          <Button className="!h-full" onClick={handleSearch}>
            <SearchOutlined className="text-[20px] px-[6px]" />
          </Button>
        </div>
      </Flex>
    </div>
  );
};

export default Tours;
