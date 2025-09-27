import { Image, Row, Col } from "antd";
import img from "../../assets/slide_cb_0_tuiblue-3.webp";

export default function TourImages() {
  return (
    <Row gutter={12}>
      {/* Cột nhỏ ảnh */}
      <Col span={6}>
        <Row gutter={[0, 12]}>
          {[...Array(3)].map((_, idx) => (
            <Col span={24} key={idx}>
              <Image 
                src={img} 
                height={100} 
                style={{
                  width: "100%",           
                  borderRadius: 4       
                }}
              />
            </Col>
          ))}
          <Col span={24}>
            <div style={{ position: "relative" }}>
              <Image src={img} height={100}  />
              <div
                style={{
                  width: 150,
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderRadius: 4
                }}
              >
                +1
              </div>
            </div>
          </Col>
        </Row>
      </Col>

      {/* Ảnh lớn */}
      <Col span={18}>
        <Image src={img} height={435} width="100%" style={{borderRadius: 4}} />
      </Col>
    </Row>
  );
}
