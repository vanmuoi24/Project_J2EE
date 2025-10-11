import { Card, Typography, Row, Col, Table, Select, Form, Button, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;
const { Option } = Select;
import type {
  // Customer
} from '@/types/Booking';

type Customer = {
  name: string;
  dob: string;
  price: number;
};

type InvoiceFormProps = {
  account: {
    fullName: string;
    email: string;
    phone: string;
  };
  customers: Customer[];
};

export default function InvoiceForm({ account, customers }: InvoiceFormProps) {
  const [form] = Form.useForm();

  // const total = customers.reduce((sum, c) => sum + c, 0);

  const navigate = useNavigate();

  const handleSubmit = (values: any) => {
    Modal.confirm({
      title: "Xác nhận thanh toán",
      content: "Bạn có chắc chắn muốn thanh toán hóa đơn này?",
      okText: "Thanh toán",
      cancelText: "Hủy",
      onOk: () => {
        message.success("Thanh toán thành công!");
        // Ví dụ: điều hướng về trang chính
        navigate("/");
        console.log("Invoice Confirm:", { ...values, account, customers });
      },
    });
  };

  const columns = [
    { title: "Tên khách hàng", dataIndex: "name", key: "name" },
    { title: "Ngày sinh", dataIndex: "dob", key: "dob" },
    { 
      title: "Giá tour", 
      dataIndex: "price", 
      key: "price", 
      render: (value: number) => value.toLocaleString("vi-VN") + " đ" 
    },
  ];

  return (
    <Card>
      <Title level={4}>Thanh toán hóa đơn</Title>

      {/* Thông tin tài khoản */}
      <div style={{ marginBottom: "16px" }}>
        <Title level={5}>Thông tin tài khoản</Title>
        <Text><b>Họ tên:</b> {account.fullName}</Text><br />
        <Text><b>Email:</b> {account.email}</Text><br />
        <Text><b>Số điện thoại:</b> {account.phone}</Text>
      </div>

      {/* Danh sách khách hàng */}
      <div style={{ marginBottom: "16px" }}>
        <Title level={5}>Danh sách khách hàng</Title>
        <Table
          dataSource={customers}
          columns={columns}
          pagination={false}
          rowKey="name"
          size="small"
        />
      </div>

      {/* Tổng thanh toán */}
      <Row justify="end" style={{ marginBottom: "16px" }}>
        <Col>
          <Text strong style={{ fontSize: "16px" }}>
            {/* Tổng thanh toán: {total.toLocaleString("vi-VN")} đ */}
          </Text>
        </Col>
      </Row>

      {/* Form chọn phương thức + thanh toán */}
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Phương thức thanh toán"
          name="paymentMethod"
          rules={[{ required: true, message: "Vui lòng chọn phương thức thanh toán" }]}
        >
          <Select placeholder="Chọn phương thức">
            <Option value="credit_card">Thẻ tín dụng/Ghi nợ</Option>
            <Option value="momo">Ví MoMo</Option>
            <Option value="bank_transfer">Chuyển khoản ngân hàng</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Thanh toán
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
