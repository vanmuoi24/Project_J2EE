import AdditionalInfo from "@/components/TourDetail/AdditionalInfo";
import ImportantInfo from "@/components/TourDetail/ImportantInfo";
import Itinerary from "@/components/TourDetail/Itinerary";
import Schedule from "@/components/TourDetail/Schedule";
import TourCard from "@/components/TourDetail/TourCardProps";
import TourDetailCard from "@/components/TourDetail/TourDetailCard";
import TourImages from "@/components/TourDetail/TourImage";
import { Row, Col, Typography } from "antd";

import img from "../assets/slide_cb_0_tuiblue-3.webp";

const { Title } = Typography;

const tours = [
    {
      id: 1,
      imageUrl: img,  
      name: "Từ Cố Đô Hoa Lư về đất Thăng Long | Hà Nội - Ninh Bình - Hạ Long",
      departureLocation: "TP. Hồ Chí Minh",
      code: "XV2SGN",
      price: 11590000,
      attractions: ["Núi Yên Tử", "Chùa Bái Đính", "Tràng An", "Yên Tử", "Ninh Bình", "Vịnh Hạ Long", "Hà Nội"],
      duration: "4N3Đ",
      transport: "Máy bay",
    },
    {
      id: 2,
      imageUrl: img,  
      name: "Hà Nội - Yên Tử - Vịnh Hạ Long - Ninh Bình - Chùa Bái Đính - KDL Tràng An",
      departureLocation: "TP. Hồ Chí Minh",
      code: "NDSGN1064",
      price: 7790000,
      attractions: ["Hồ Gươm", "Lăng Bác", "Chùa Một Cột", "Yên Tử", "Vịnh Hạ Long", "Tràng An"],
      duration: "4N3Đ",
      transport: "Máy bay",
    },
    {
      id: 3,
      imageUrl: img,  
      name: "Hà Nội - Sapa - Bản Cát Cát - Fansipan - Lào Cai - Tặng vé xe lửa Mường Hoa",
      departureLocation: "TP. Hồ Chí Minh",
      code: "NDSGN1965",
      price: 7290000,
      attractions: ["Fansipan", "Bản Cát Cát", "Thác Bạc", "Cổng Trời", "Nhà thờ Đá"],
      duration: "4N3Đ",
      transport: "Máy bay",
    },
  ];

export default function TourDetail() {
  return (
    <div style={{ padding: "24px 0" }}>
      <Row justify="center">
        <Col xs={24} md={22} lg={22} xl={20} xxl={16}>
          <Title level={4} style={{ marginBottom: 24, fontWeight: 700, padding: "0 12px"}}>
            Thái Lan: Bangkok - Pattaya - Ayutthaya (Khách sạn 5 sao, Làng Nong Nooch,
            Chợ nổi Bốn miền, Thưởng thức buffet tối trên Du thuyền 5 sao & cafe máy bay 
            Boeing 747, Tặng trà sữa Thái Lan)
          </Title>

          <Row gutter={24}>
            <Col span={17}>
              <TourImages />
              <Schedule />
              <AdditionalInfo />
              <Itinerary />
              <ImportantInfo />
            </Col>

            <Col span={7}>
              <div
                style={{
                  position: "sticky",
                  top: 24,
                  alignSelf: "flex-start", // đảm bảo sticky tính từ đầu Col
                }}
              >
                <TourDetailCard />
              </div>
            </Col>
          </Row>
          <Title level={3} style={{ marginTop: 48, marginBottom: 24, fontWeight: 700, textAlign: 'center', color:'#0B5DA7' }}>
                CÁC CHƯƠNG TRÌNH KHÁC
          </Title>
          
          <Row gutter={[24, 24]} justify="center">
            {tours.map((tour) => (
              <Col key={tour.id}>
                <TourCard tour={tour} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
