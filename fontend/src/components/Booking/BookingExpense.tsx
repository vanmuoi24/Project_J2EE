import { Card, Typography, Row, Col } from "antd";

const { Title, Text } = Typography;

type ExpenseItem = {
  label: string;
  quantity: number;
  price: number;
};

type BookingExpenseProps = {
  total: number;
  items: ExpenseItem[];
  singleRoomSurcharge?: number;
};

function formatCurrency(value: number) {
  return value.toLocaleString("vi-VN") + " đ";
}

export default function BookingExpense({
  total,
  items,
  singleRoomSurcharge = 0,
}: BookingExpenseProps) {
  return (
    <>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={5}>
            KHÁCH HÀNG + PHỤ THU
          </Title>
        </Col>
        <Col>
          <Title level={4} style={{ color: "red", margin: 0 }}>
            {formatCurrency(total)}
          </Title>
        </Col>
      </Row>

      <div style={{ marginTop: "12px" }}>
        {items.map((item, index) => (
          <Row key={index} justify="space-between" style={{ marginBottom: "6px" }}>
            <Col>
              <Text>{item.label}</Text>
            </Col>
            <Col>
              <Text>
                {item.quantity} x {formatCurrency(item.price)}
              </Text>
            </Col>
          </Row>
        ))}

        <Row justify="space-between">
          <Col>
            <Text>Phụ thu phòng đơn</Text>
          </Col>
          <Col>
            <Text>{formatCurrency(singleRoomSurcharge)}</Text>
          </Col>
        </Row>
      </div>
      </>
  );
}
