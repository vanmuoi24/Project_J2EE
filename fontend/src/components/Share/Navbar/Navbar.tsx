import { Link } from "react-router-dom";
import { Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import brand from "@/assets/images/brand.jpg";
import Container from "@/components/Share/Container";
import { useState } from "react";
import TabsMore from "./TabsMore";
import TabsDest from "./TabsDest";

const Navbar: React.FC = () => {
  

  const [isOpenDest, setIsOpenDest] = useState<boolean>(false);
  const [isOpenMore, setIsOpenMore] = useState<boolean>(false);

  return (
    <div className="bg-white shadow-sm">
      <Container className="flex items-center justify-between relative py-[10px]">
        {/* Logo */}
        <div className="flex-1">
          <Link to="/" className="w-[200px] h-[60px] block">
            <img
              src={brand}
              alt="brand"
              className="w-full h-full object-contain"
            />
          </Link>
        </div>

        {/* Menu chính */}
        <div className="flex-1 flex items-center gap-5">
          <Menu
            mode="horizontal"
            selectable={false}
            className="flex-1 border-none h-[60px]"
            items={[
              {
                key: "home",
                label: (
                  <Link
                    to="/"
                    className="text-black text-[16px] font-[700] text-base hover:text-blue-500 transition"
                  >
                    Home
                  </Link>
                ),
              },
              {
                key: "dest",
                label: (
                  <span
                    className="block text-black text-[16px] font-[700] text-base hover:text-blue-500 transition"
                    onClick={() => {
                      setIsOpenDest(!isOpenDest)
                      setIsOpenMore(false)
                    }}
                  >
                    Điểm đến
                  </span>
                ),
              },
              {
                key: "tours",
                label: (
                  <Link
                    to="/tours"
                    className="text-black text-[16px] font-[700] text-base hover:text-blue-500 transition"
                  >
                    Tours
                  </Link>
                ),
              },
            ]}
          />

          <button
            onClick={() => {
               setIsOpenMore(!isOpenMore)
               setIsOpenDest(false)
            }}
            className="text-black font-bold cursor-pointer p-[4px] bg-[#fff] border-none"
          >
            <MenuOutlined  className="text-[20px]"/>
          </button>
        </div>

        <TabsMore isOpen={isOpenMore} setIsOpen={setIsOpenMore} />
        <TabsDest isOpen={isOpenDest} setIsOpen={setIsOpenDest} />
        
      
      </Container>
    </div>
  );
};

export default Navbar;
