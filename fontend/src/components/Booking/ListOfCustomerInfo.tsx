import { useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Row,
  Col,
  Button,
  Divider,
  Switch,
  Typography,
} from "antd";

const { Title } = Typography;
const { Option } = Select;

type Customer = {
  id: number;
  type: "adult" | "child" | "baby";
};

export default function ListOfCustomerInfo() {
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, type: "adult" }, // mặc định có 1 người lớn
  ]);

  const addCustomer = (type: "adult" | "child" | "baby") => {
    setCustomers((prev) => [
      ...prev,
      { id: prev.length + 1, type },
    ]);
  };

  return (
    <div>
      <Title level={4}>Hành khách</Title>

      {/* Bộ đếm + nút thêm */}
      <Row gutter={16} className="mb-6">
        <Col span={8}>
          <div className="flex justify-between items-center border rounded p-2">
            <div>
              <p className="font-medium">Người lớn</p>
              <p className="text-xs text-gray-500">Từ 12 tuổi trở lên</p>
            </div>
            <Button
              type="primary"
              onClick={() => addCustomer("adult")}
            >
              + Thêm
            </Button>
          </div>
        </Col>
        <Col span={8}>
          <div className="flex justify-between items-center border rounded p-2">
            <div>
              <p className="font-medium">Trẻ em</p>
              <p className="text-xs text-gray-500">Từ 2 - 11 tuổi</p>
            </div>
            <Button
              type="primary"
              onClick={() => addCustomer("child")}
            >
              + Thêm
            </Button>
          </div>
        </Col>
        <Col span={8}>
          <div className="flex justify-between items-center border rounded p-2">
            <div>
              <p className="font-medium">Em bé</p>
              <p className="text-xs text-gray-500">Dưới 2 tuổi</p>
            </div>
            <Button
              type="primary"
              onClick={() => addCustomer("baby")}
            >
              + Thêm
            </Button>
          </div>
        </Col>
      </Row>

      <Divider />

      {/* Render danh sách khách */}
      <Title level={5}>Thông tin hành khách</Title>
      {customers.map((c, index) => (
        <Form layout="vertical" key={c.id} style={{ marginBottom: "24px" }}>
          <Row gutter={16} align="middle">
            <Col span={24}>
              <p className="font-medium mb-2">
                {index + 1}. {c.type === "adult" && "Người lớn"}{" "}
                {c.type === "child" && "Trẻ em"}{" "}
                {c.type === "baby" && "Em bé"}
              </p>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Họ tên"
                name={`fullName_${c.id}`}
                rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
              >
                <Input placeholder="Nhập họ tên" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Giới tính"
                name={`gender_${c.id}`}
                rules={[{ required: true, message: "Chọn giới tính" }]}
              >
                <Select placeholder="Chọn">
                  <Option value="male">Nam</Option>
                  <Option value="female">Nữ</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Ngày sinh"
                name={`dob_${c.id}`}
                rules={[{ required: true, message: "Chọn ngày sinh" }]}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Phòng đơn" name={`singleRoom_${c.id}`}>
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ))}

      <Divider />

      {/* Ghi chú */}
      <Title level={5}>Ghi chú</Title>
      <Form.Item name="note">
        <Input.TextArea
          rows={3}
          placeholder="Vui lòng nhập nội dung lời nhắn bằng tiếng Việt hoặc tiếng Anh"
        />
      </Form.Item>
    </div>
  );
}
