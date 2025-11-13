import React from 'react';
import { Form, Input, Button, Select } from 'antd';

interface AddDestinationProps {
  onSubmit?: (values: any) => void;
}

const AddDestination: React.FC<AddDestinationProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    console.log('Add Destination:', values);
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
          rules={[{ required: true, message: 'Vui lòng nhập tên điểm đến' }]}
        >
          <Input placeholder="Nhập tên điểm đến" size="large" />
        </Form.Item>

        <Form.Item
          label="Quốc gia"
          name="country"
          rules={[{ required: true, message: 'Vui lòng nhập quốc gia' }]}
        >
          <Input placeholder="Nhập quốc gia" size="large" />
        </Form.Item>

        <Form.Item
          label="Thành phố"
          name="city"
          rules={[{ required: true, message: 'Vui lòng nhập thành phố' }]}
        >
          <Input placeholder="Nhập thành phố" size="large" />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={4} placeholder="Nhập mô tả" />
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

export default AddDestination;
