import { Collapse, theme, Typography } from "antd";
import type { CollapseProps } from "antd";
import type { CSSProperties } from "react";

const { Title } = Typography;

const getItems:(panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
    {
      key: "1",
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <span style={{fontWeight: "650", fontSize: 13}}>Ngày 1: Đà Nẵng - SB Nội Bài (Hà Nội)</span>
          <span style={{ fontWeight: 500, fontSize: 12, color: "#555" }}>
            00 bữa ăn (tự túc ăn ngày đầu tiên)
          </span>
        </div>
      ),
      children: (
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.15)"}}>
          <p>
            Quý khách tập trung tại sân bay Đà Nẵng, hướng dẫn viên hỗ trợ làm thủ tục bay đi Hà
            Nội.
          </p>
          <div style={{ textAlign: "right" }}>
            <b>Nghỉ đêm tại Hà Nội</b>
          </div>
        </div>
      ),
      style: panelStyle,
    },
    {
      key: "2",
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <span style={{fontWeight: "650", fontSize: 13}}>Ngày 2: Hà Nội - Lạng Sơn - Cao Bằng: 'Chạm vào di sản'</span>
          <span style={{ fontWeight: 500, fontSize: 12, color: "#555" }}>03 bữa ăn (sáng, trưa, chiều)</span>
        </div>
      ),
      children: (
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.15)"}}>
          <p>
            Quý khách tập trung tại sân bay Đà Nẵng, hướng dẫn viên hỗ trợ làm thủ tục bay đi Hà
            Nội.
          </p>
          <div style={{ textAlign: "right" }}>
            <b>Nghỉ đêm tại Hà Nội</b>
          </div>
        </div>
      ),
      style: panelStyle,
    },
    {
      key: "3",
      label: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <span style={{fontWeight: "650", fontSize: 13}}>Ngày 3: Non nước Cao Bằng - Trùng Khánh</span>
          <span style={{ fontWeight: 500, fontSize: 12, color: "#555" }}>03 bữa ăn (sáng, trưa, chiều)</span>
        </div>
      ),
      children: (
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.15)"}}>
          <p>
            Quý khách tập trung tại sân bay Đà Nẵng, hướng dẫn viên hỗ trợ làm thủ tục bay đi Hà
            Nội.
          </p>
          <div style={{ textAlign: "right" }}>
            <b>Nghỉ đêm tại Hà Nội</b>
          </div>
        </div>
      ),
      style: panelStyle,
    },
  ];

const Itinerary: React.FC = () => {
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 10,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  return (
    <div>
      <Title
        level={4}
        style={{ textAlign: "center", marginTop: 38, marginBottom: 18, fontWeight: 700 }}
      >
        LỊCH TRÌNH
      </Title>

      <Collapse
        items={getItems(panelStyle)}
        expandIconPosition="end"
        bordered={false}
        style={{ background: token.colorBgContainer }}
        className="custom-collapse"
      />
    </div>
  );
};

export default Itinerary;
