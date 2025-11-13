import Container from '@/components/Share/Container';
import { Card } from 'antd';
import React from 'react';

const Achievements = () => {
  const achievements = [
    {
      title: 'Top 10 công ty du lịch hàng đầu Việt Nam',
      desc: 'Được khách hàng và các tổ chức uy tín bình chọn nhiều năm liên tiếp',
      icon: '🥇',
    },
    {
      title: 'Đối tác chính thức của 50+ hãng xe du lịch',
      desc: 'Đảm bảo lịch trình uy tín, hợp tác chặt chẽ với các hãng xe lớn trong nước',
      icon: '🚌',
    },
    {
      title: 'Thành viên Hiệp hội Du lịch Việt Nam',
      desc: 'Cam kết chất lượng dịch vụ và đạo đức nghề nghiệp',
      icon: '💼',
    },
    {
      title: 'Giải thưởng Dịch vụ xuất sắc',
      desc: 'Nhận nhiều giải thưởng uy tín cho chất lượng tour và chăm sóc khách hàng',
      icon: '🏅',
    },
  ];

  return (
    <div className="py-16 bg-white !mb-20">
      <Container>
        <h2 className="text-3xl md:text-4xl text-center font-poppins font-bold text-[#7BBCB0] !mb-10 uppercase">
          Thành tựu & Giải thưởng
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item, index) => (
            <Card
              key={index}
              hoverable
              className="flex flex-col items-center text-center rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-5xl  !mb-4">{item.icon}</div>
              <h3 className="text-xl text-[#7BBCB0] font-semibold font-poppins mb-2">
                {item.title}
              </h3>
              <p className=" text-[#778088] font-inter">{item.desc}</p>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Achievements;
