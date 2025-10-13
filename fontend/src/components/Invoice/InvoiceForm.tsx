import { Card, Typography, Table, Select, Form, Button, message, Modal } from "antd";
import { formatCurrencyVND } from "@/utils";

const { Title, Text } = Typography;
const { Option } = Select;

type Customer = {
  name: string;
  dob?: string;
  price: number;
};

type InvoiceFormProps = {
  account: {
    fullName: string;
    email: string;
    phone: string;
  };
  customers: Customer[];
  onCreate?: (values: { paymentMethod: string; items: Customer[] }) => Promise<void> | void;
};

export default function InvoiceForm({ account, customers, onCreate }: InvoiceFormProps) {
  const [form] = Form.useForm();

  const columns = [
    { title: "Tên khách hàng", dataIndex: "name", key: "name" },
    { title: "Ngày sinh", dataIndex: "dob", key: "dob" },
    {
      title: "Giá tour",
      dataIndex: "price",
      key: "price",
      render: (value: number) => formatCurrencyVND(value),
    },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
  ];

  const handleSubmit = (values: any) => {
    Modal.confirm({
      title: "Xác nhận thanh toán",
      content: "Bạn có chắc chắn muốn thanh toán hóa đơn này?",
      okText: "Thanh toán",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const payload = { paymentMethod: values.paymentMethod, items: customers };
          if (onCreate) await Promise.resolve(onCreate(payload));
        } catch (err: any) {
          message.error(err?.message || 'Tạo hóa đơn thất bại');
          throw err;
        }
      },
    });
  };

  return (
    <Card>
      <Title level={4}>Thanh toán</Title>

      {/* Thông tin tài khoản */}
      <div style={{ marginBottom: "16px" }}>
        <Title level={5}>Thông tin tài khoản</Title>
        <Text><b>Họ tên:</b> {account.fullName}</Text><br />
        <Text><b>Email:</b> {account.email}</Text><br />
        <Text><b>Số điện thoại:</b> {account.phone}</Text><br />
      </div>

      {/* Danh sách khách hàng */}
      <div style={{ marginBottom: "16px" }}>
        <Title level={5}>Danh sách khách hàng</Title>
        <Table
          dataSource={customers}
          columns={columns}
          pagination={false}
          rowKey={(r: any) => r.name + (r.dob || '')}
          size="small"
        />
      </div>

      {/* Form chọn phương thức + thanh toán */}
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Phương thức thanh toán"
          name="paymentMethod"
          rules={[{ required: true, message: "Vui lòng chọn phương thức thanh toán" }]}
        >
          <Select placeholder="Chọn phương thức">
            <Option value="cash">Tiền mặt</Option>
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
