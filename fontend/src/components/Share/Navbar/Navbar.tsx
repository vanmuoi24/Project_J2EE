import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import brand from '@/assets/images/brand.jpg';
import Container from '@/components/Share/Container';

const Navbar: React.FC = () => {
  return (
    <div className="bg-white shadow-sm">
      <Container className="flex items-center justify-between relative py-[10px]">
        {/* Logo */}
        <div className="flex-1">
          <Link to="/" className="w-[200px] h-[60px] block">
            <img src={brand} alt="brand" className="w-full h-full object-contain" />
          </Link>
        </div>

        {/* Menu chính */}
        <div className="flex-1 flex items-center gap-5">
          <Menu
            mode="horizontal"
            selectable={false}
            className="flex-1 border-none h-[60px] flex items-center"
            items={[
              {
                key: 'tours',
                label: (
                  <Link
                    to="/tours"
                    className="text-black text-[16px] font-[700] text-base hover:text-blue-500 transition"
                  >
                    Chuyến đi
                  </Link>
                ),
              },
              {
                key: 'rating',
                label: (
                  <Link
                    to="/rating"
                    className="text-black text-[16px] font-[700] text-base hover:text-blue-500 transition"
                  >
                    Đánh giá
                  </Link>
                ),
              },
              {
                key: 'promotion',
                label: (
                  <Link
                    to="/promotion"
                    className="text-black text-[16px] font-[700] text-base hover:text-blue-500 transition"
                  >
                    Ưu đãi
                  </Link>
                ),
              },
            ]}
          />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
