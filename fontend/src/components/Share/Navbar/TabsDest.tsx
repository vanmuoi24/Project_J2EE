import { Button, ConfigProvider, Tabs } from 'antd';
import type { TabsProps } from 'antd/lib';
import { CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface IProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const Item = ({
  dest,
  area,
  setIsOpen,
}: {
  dest: { city: string; id: number };
  area: string;
  setIsOpen: (val: boolean) => void;
}) => {
  return (
    <>
      <li className="list-none" key={dest.id}>
        <Link
          to={`/tours/${area === 'trong-nuoc' ? 'domestic' : 'international'}/${dest.city}`}
          className="relative text-[14px] font-[600] cursor-pointer decoration-none"
          onClick={() => setIsOpen(false)}
        >
          {dest.city}
        </Link>
      </li>
    </>
  );
};

const List = ({
  title,
  dests,
  area,
  setIsOpen,
}: {
  title: string;
  dests: { city: string; id: number }[];
  area: string;
  setIsOpen: (val: boolean) => void;
}) => {
  return (
    <div className="flex-1 min-w-[200px] mx-[20px]">
      <h3 className="font-[700] text-lg mb-3 text-gray-800">{title}</h3>
      <ul className="flex flex-col gap-y-[10px] text-gray-600">
        {dests.map((dest) => (
          <Item dest={dest} area={area} setIsOpen={setIsOpen} />
        ))}
      </ul>
    </div>
  );
};

const destsMB = [
  { id: 1, city: 'Hà Nội' },
  { id: 2, city: 'Hạ Long' },
  { id: 3, city: 'Hải Phòng' },
  { id: 4, city: 'Sapa' },
];
const destsMT = [
  { id: 1, city: 'Đà Nẵng' },
  { id: 2, city: 'Huế' },
  { id: 3, city: 'Quảng Bình' },
  { id: 4, city: 'Nha Trang' },
];
const destsDNB = [
  { id: 1, city: 'TP. Hồ Chí Minh' },
  { id: 2, city: 'Đồng Nai' },
  { id: 3, city: 'Bình Dương' },
  { id: 4, city: 'Vũng Tàu' },
];
const destsTNB = [
  { id: 1, city: 'Bến Tre' },
  { id: 2, city: 'Tiền Giang' },
  { id: 3, city: 'Trà Vinh' },
  { id: 4, city: 'Cần Thơ' },
];

const destsCA = [
  { id: 1, city: 'Nhật Bản' },
  { id: 2, city: 'Hàn Quốc' },
  { id: 3, city: 'Thái Lan' },
  { id: 4, city: 'Singapore' },
];
const destsCAU = [
  { id: 1, city: 'Pháp' },
  { id: 2, city: 'Anh' },
  { id: 3, city: 'Đức' },
  { id: 4, city: 'Ý' },
];
const destsCM = [
  { id: 1, city: 'Mỹ' },
  { id: 2, city: 'Canada' },
  { id: 3, city: 'Brazil' },
];
const destsCP = [
  { id: 1, city: 'Ai Cập' },
  { id: 2, city: 'Nam Phi' },
  { id: 3, city: 'Marooc' },
];
const destsCDD = [
  { id: 1, city: 'Úc' },
  { id: 2, city: 'New Zealand' },
];

const TabsDest = ({ isOpen, setIsOpen }: IProps) => {
  const items: TabsProps['items'] = [
    {
      key: 'domestic',
      label: 'Trong nước',
      children: (
        <div className="flex justify-between bg-white rounded-[10px]">
          <List title="MIỀN BẮC" dests={destsMB} area="trong-nuoc" setIsOpen={setIsOpen} />
          <List title="MIỀN TRUNG" dests={destsMT} area="trong-nuoc" setIsOpen={setIsOpen} />
          <List title="ĐÔNG NAM BỘ" dests={destsDNB} area="trong-nuoc" setIsOpen={setIsOpen} />
          <List title="TÂY NAM BỘ" dests={destsTNB} area="trong-nuoc" setIsOpen={setIsOpen} />
        </div>
      ),
    },
    {
      key: 'international',
      label: 'Ngoài nước',
      children: (
        <div className="flex justify-between bg-white rounded-[10px]">
          <List title="CHÂU Á" dests={destsCA} area="ngoai-nuoc" setIsOpen={setIsOpen} />
          <List title="CHÂU ÂU" dests={destsCAU} area="ngoai-nuoc" setIsOpen={setIsOpen} />
          <List title="CHÂU MỸ" dests={destsCM} area="ngoai-nuoc" setIsOpen={setIsOpen} />
          <List title="CHÂU PHI" dests={destsCP} area="ngoai-nuoc" setIsOpen={setIsOpen} />
          <List title="CHÂU ĐẠI DƯƠNG" dests={destsCDD} area="ngoai-nuoc" setIsOpen={setIsOpen} />
        </div>
      ),
    },
  ];

  return (
    <>
      <div
        className={`absolute w-full bg-[#fff] border-none top-[108%] rounded-[8px] !p-[10px] z-50 flex justify-between transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-3 invisible'
        } shadow-xl`}
      >
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                titleFontSize: 16,
              },
            },
          }}
        >
          <Tabs
            defaultActiveKey="transportations"
            tabPosition="left"
            items={items}
            className="flex-1"
          />
        </ConfigProvider>

        <Button
          onClick={() => setIsOpen(false)}
          className="flex items-center justify-center border-none bg-transparent hover:bg-gray-100"
        >
          <CloseOutlined className="text-base font-bold" />
        </Button>
      </div>
    </>
  );
};

export default TabsDest;
