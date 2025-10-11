import { Typography, Row, Col, Button } from "antd";
const { Title, Text } = Typography;

export default function BookingConfirmation({
  personalInfo,
  customerListInfo,
  onConfirmClick,
}: {
  personalInfo?: any;
  customerListInfo?: any[];
  onConfirmClick: () => void;
}) {
  function handleBookingConfirmation() {
    onConfirmClick();
  }

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={5}>THÔNG TIN XÁC NHẬN</Title>
        </Col>
      </Row>

      <div style={{ marginTop: "12px" }}>
        <Title level={5}>Thông tin cá nhân</Title>
        {personalInfo ? (
          <div style={{ marginBottom: "12px" }}>
            <Text>Họ tên: {personalInfo.fullName || "(chưa nhập)"}</Text>
            <br />
            <Text>Email: {personalInfo.email || "(chưa nhập)"}</Text>
          </div>
        ) : (
          <Text type="secondary">Chưa có thông tin cá nhân</Text>
        )}

        <Title level={5} style={{ marginTop: "16px" }}>
          Danh sách khách đi cùng
        </Title>
        {customerListInfo && customerListInfo.length > 0 ? (
          customerListInfo.map((c, i) => (
            <div key={i}>
              <Text>
                {i + 1}. {c.name || "Chưa nhập tên"} - {c.age || "?"} tuổi
              </Text>
            </div>
          ))
        ) : (
          <Text type="secondary">Chưa có khách đi cùng</Text>
        )}

        <Row justify="center" style={{ marginTop: "24px" }}>
          <Col>
            <Button type="primary" size="large" onClick={handleBookingConfirmation}>
              Xác nhận đặt tour
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}
