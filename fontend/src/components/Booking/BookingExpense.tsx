import { Card, Typography, Row, Col, Button, Modal, message } from "antd";
import { useNavigate, useNavigation } from "react-router-dom";

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
  onConfirm?: () => void | Promise<void>;
};

function formatCurrency(value: number) {
  return value.toLocaleString("vi-VN") + " đ";
}

export default function BookingExpense({
  total,
  singleRoomSurcharge = 0,
  items,
  onConfirm,
}: BookingExpenseProps) {
  
  const handleConfirm = () => {
    Modal.confirm({
      title: 'Xác nhận đặt tour',
      content: 'Bạn có chắc chắn muốn đặt tour này?',
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await Promise.resolve(onConfirm?.());
          message.success('Đặt tour thành công');
        } catch (err: any) {
          message.error(err?.message || 'Đặt tour thất bại');
          throw err;
        }
      }
    });
  };
  
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
      <div style={{ marginTop: 16 }}>
        <Button type="primary" block size="large" onClick={handleConfirm}>
          Xác nhận đặt tour
        </Button>
      </div>
      </>
  );
}
