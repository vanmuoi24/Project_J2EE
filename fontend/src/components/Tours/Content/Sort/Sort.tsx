import { Select } from 'antd';

const Sort = () => {
  return (
    <div className="flex gap-2 items-center justify-center">
      <p className="!mb-0 text-[16px] font-[600]">Sắp xếp theo: </p>
      <div className="flex justify-between items-center text-[16px] font-[600]">
        <Select defaultValue="popular" className="w-48 ">
          <Select.Option value="popular">
            <span className="text-[16px]">Phổ biến nhất</span>
          </Select.Option>
          <Select.Option value="newest">
            <span className="text-[16px]">Mới nhất</span>
          </Select.Option>
          <Select.Option value="priceLow">
            <span className="text-[16px]">Giá thấp đến cao</span>
          </Select.Option>
          <Select.Option value="priceHigh">
            <span className="text-[16px]">Giá cao đến thấp</span>
          </Select.Option>
        </Select>
      </div>
    </div>
  );
};

export default Sort;
