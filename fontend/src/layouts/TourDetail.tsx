  import AdditionalInfo from "@/components/TourDetail/AdditionalInfo";
import ImportantInfo from "@/components/TourDetail/ImportantInfo";
import Itinerary from "@/components/TourDetail/Itinerary";
import Schedule from "@/components/TourDetail/Schedule";
  import TourDetailCard from "@/components/TourDetail/TourDetailCard";
  import TourImages from "@/components/TourDetail/TourImage";
  import { Row, Col, Typography } from "antd";

  const { Title } = Typography;

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
          </Col>
        </Row>
      </div>
    );
  }
