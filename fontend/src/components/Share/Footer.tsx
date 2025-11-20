import {
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
  YoutubeFilled,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import Container from '@/components/Share/Container';
import momo from '@/assets/images/momo.png';
import certificate from '@/assets/images/certificate.webp';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white !pt-16 !pb-6">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* 1. Logo + Intro */}
          <div>
            <h2 className="text-2xl font-bold !mb-4">SGUTour</h2>
            <p className="text-gray-300">
              Khám phá Việt Nam và hơn thế nữa với các chuyến tham quan được tuyển chọn cẩn thận,
              các ưu đãi vào phút chót và những trải nghiệm khó quên.
            </p>
          </div>

          {/* 2. Quick Links */}
          {/* <div>
            <h4 className="font-semibold text-lg !mb-4">Quick Links</h4>
            <ul className="!space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Destinations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Tours
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div> */}

          {/* 3. Contact Info */}
          <div>
            <h4 className="font-semibold text-lg !mb-4">Liên hệ</h4>
            <p className="flex items-center gap-2 !mb-2">
              <EnvironmentOutlined /> 123 Nguyễn Huệ, Quận 1, TP.HCM
            </p>
            <p className="flex items-center gap-2 !mb-2">
              <PhoneOutlined /> +84 123 456 789
            </p>
            <p className="flex items-center gap-2 !mb-2">
              <MailOutlined /> support@travelvn.com
            </p>

            {/* Payment */}
            <h4 className="font-semibold text-lg !mt-6 !mb-2">Thanh toán</h4>
            <div className="flex gap-4">
              <CreditCardOutlined style={{ fontSize: 24 }} title="Bank" />
              <img src={momo} alt="Momo" className="h-6" />
              <img src="/icons/zalopay.png" alt="ZaloPay" className="h-6" />
            </div>
          </div>

          {/* 4. Social + Certificate */}
          <div>
            <h4 className="font-semibold text-lg !mb-2">Theo dõi chúng tôi</h4>
            <div className="flex gap-3 !mb-6 text-2xl">
              <a href="#" className="hover:text-blue-400 transition">
                <FacebookFilled />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <TwitterSquareFilled />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <InstagramFilled />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <YoutubeFilled />
              </a>
            </div>

            <h4 className="font-semibold text-lg !mb-2">Xác nhận</h4>
            {/* <div className="flex items-center gap-2">
              <SafetyCertificateOutlined style={{ fontSize: 28 }} />
              <span className="text-gray-300">Trusted Travel Agency</span>
            </div> */}
            <div className="!mt-3">
              <img src={certificate} alt="Certificate" className="w-[120px]" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 !mt-10 !pt-4 text-center text-gray-400 text-sm">
          PhathociT Design ©{new Date().getFullYear()} Created by Ant UED
        </div>
      </Container>
    </footer>
  );
};
