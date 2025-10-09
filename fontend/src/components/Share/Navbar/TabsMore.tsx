import { Button, ConfigProvider, Menu, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import type { TabsProps } from "antd/lib";
import { CloseOutlined } from '@ant-design/icons';

interface IProps {
   isOpen: boolean,
   setIsOpen: (val : boolean) => void
}


const TabsMore = ({isOpen, setIsOpen}: IProps) => {

   const items: TabsProps["items"] = [
    {
      key: "transportations",
      label: "Transportations",
      children: (
        <Menu
          mode="vertical"
          selectable={false}
          className="bg-transparent border-none"
          items={[
            {
              key: "item1",
              label: (
                <Link to="/" className="text-black font-semibold text-sm">
                  Car rental
                </Link>
              ),
            },
            {
              key: "item2",
              label: (
                <Link to="/" className="text-black font-semibold text-sm">
                  Flights
                </Link>
              ),
            },
          ]}
        />
      ),
    },
    {
      key: "promotions",
      label: "Promotions",
      children: (
        <Menu
          mode="vertical"
          selectable={false}
          className="bg-transparent border-none"
          items={[
            {
              key: "item1",
              label: (
                <Link to="/" className="text-black font-semibold text-sm">
                  Ưu đãi 1
                </Link>
              ),
            },
            {
              key: "item2",
              label: (
                <Link to="/" className="text-black font-semibold text-sm">
                  Ưu đãi 2
                </Link>
              ),
            },
          ]}
        />
      ),
    },
    {
      key: "news",
      label: "News",
      children: (
        <Menu
          mode="vertical"
          selectable={false}
          className="bg-transparent border-none"
          items={[
            {
              key: "item1",
              label: (
                <Link to="/" className="text-black font-semibold text-sm">
                  News
                </Link>
              ),
            },
            {
              key: "item2",
              label: (
                <Link to="/" className="text-black font-semibold text-sm">
                  Travel news
                </Link>
              ),
            },
          ]}
        />
      ),
    },
  ];



  return (
      <>
         <div
          className={`absolute w-full bg-[#fff] top-[108%] rounded-[8px] p-2 z-50 flex justify-between transition-all duration-300 ${
            isOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-3 invisible"
          }`}
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
  )
}

export default TabsMore