import { SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Divider, Flex, Input, Select, type SelectProps } from 'antd';
import type { DatePickerProps } from 'antd/lib';
import dayjs from 'dayjs';

const Tours = () => {
  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log('onChangeDate: ', date, dateString);
  };

  const onChangePrice: SelectProps['onChange'] = (value) => {
    console.log('onChangePrice: ', value);
  };

  const dataRangePrices = [
    { value: '<5', label: 'Dưới 5 triệu' },
    { value: '5-10', label: 'Từ 5 đến 10 triệu' },
    { value: '10-20', label: 'Từ 10 đến 20 triệu' },
    { value: '>20', label: 'Trên 20 triệu' },
  ];

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
            onChange={onChangeDate}
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
              onChange={onChangePrice}
              options={dataRangePrices}
              className="!w-[180px]"
            />
          </div>
          <Button className="!h-full">
            <SearchOutlined className="text-[20px] px-[6px]" />
          </Button>
        </div>
      </Flex>
    </div>
  );
};

export default Tours;
