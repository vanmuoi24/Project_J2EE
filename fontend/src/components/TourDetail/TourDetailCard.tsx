import { CalendarFilled, CalendarOutlined, TagOutlined } from "@ant-design/icons";
import { Card, Typography, Tag, Button, List } from "antd";

const { Text, Title } = Typography;

export default function TourDetailCard() {
  return (
    <Card 
      style={{ width: "100%", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
      bodyStyle={{ padding: 15 }} 
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <Text style={{ fontWeight: 700 }}>Giá từ:</Text>

        {/* <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <Text delete type="secondary" style={{ fontSize: 12 }}>7.990.000 ₫</Text>
          <Text type="secondary" style={{ fontWeight: 500, fontSize: 12 }}>/ Khách</Text>
        </div> */}
      </div>

      <Title level={3} style={{ color: "#E01600", margin: "8px 0", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
        7.490.000 ₫
        <span style={{ fontSize: 14, fontWeight: 500, color: "#555" }}>/ Khách</span>
      </Title>
{/* 
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Tag
          color="#FFDBE1"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 4,
            width: "100%",
            color: "#E01600",
            fontSize: 10,
            fontWeight: 500,
            whiteSpace: "normal",
            padding: "4px 8px",
            margin: 0,        
          }}
        >
          <span style={{ fontSize: 15 }}>🎁</span>
          <span>Đặt ngay để nhận được ưu đãi giờ chót tiết kiệm thêm 500K</span>
        </Tag>
      </div> */}


      <List
        size="small"
        bordered={false}
        dataSource={[
          "Mã chương trình: NDSGN3369",
        ]}
        // dataSource={[
        //   "Mã tour: NDSGN3369-059-280925VN",
        //   "Khởi hành: TP. Hồ Chí Minh",
        //   "Ngày khởi hành: 28-09-2025",
        //   "Thời gian: 4N3Đ",
        //   "Số chỗ còn: 5",
        // ]}
        style={{ padding: 0, margin: 0 }}
        renderItem={(item) => (
          <List.Item style={{ padding: 0, border: "none" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {item.startsWith("Mã chương trình") && (
                <TagOutlined style={{ color: "#fa8c16" }} />
              )}
              <Text strong={item.startsWith("Mã chương trình")}>{item}</Text>
            </span>
          </List.Item>
        )}
      />

      {/* <div style={{ marginTop: 16, display: "flex", gap: "8px" }}>
        <Button>Ngày khác</Button>
        <Button type="primary" danger>
          Đặt ngay
        </Button>
      </div> */}
      <div style={{ marginTop: 16, display: "flex", gap: "8px" }}>
        <Button
          icon={<CalendarOutlined />}
            style={{
              backgroundColor: "#155790", 
              color: "#fff",              
              border: "none",           
              fontWeight: 500,
              fontSize: 12,
              width: "100%"
            }}
          >
          Chọn ngày khởi hành
        </Button>
      </div>


    </Card>
  );
}