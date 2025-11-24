import React from 'react';
import { Form, Input, Button, Select } from 'antd';
const { Option } = Select;

interface AddLocationProps {
  onSubmit?: (values: any) => void;
}

const AddLocation: React.FC<AddLocationProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    if (onSubmit) onSubmit(values);
    form.resetFields();
  };

  return (
    <div
      style={{
        padding: 24,
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ marginBottom: 20, color: '#1890ff' }}>Thêm điểm đến mới</h2>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Tên điểm đến"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên địa điểm' }]}
        >
          <Input placeholder="Nhập tên địa điểm" size="large" />
        </Form.Item>

        <Form.Item
          label="Loại điểm"
          name="type"
          rules={[{ required: true, message: 'Vui lòng chọn loại điểm' }]}
        >
          <Select placeholder="Chọn loại điểm" size="large">
            <Option value="DEPARTURE">DEPARTURE</Option>
            <Option value="DESTINATION">DESTINATION</Option>
          </Select>
        </Form.Item>

        <Form.Item style={{ textAlign: 'right', marginTop: 16 }}>
          <Button type="primary" htmlType="submit" size="large" style={{ minWidth: 140 }}>
            Thêm điểm đến
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddLocation;
