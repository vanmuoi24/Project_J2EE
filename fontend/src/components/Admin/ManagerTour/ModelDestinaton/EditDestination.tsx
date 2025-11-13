import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';

interface EditDestinationProps {
  data?: any;
  onSubmit?: (values: any) => void;
}

const EditDestination: React.FC<EditDestinationProps> = ({ data, onSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    } else {
      form.resetFields();
    }
  }, [data, form]);

  const handleFinish = (values: any) => {
    console.log('Edit Destination:', values);
    if (onSubmit) onSubmit(values);
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
      <h2 style={{ marginBottom: 20, color: '#1890ff' }}>Chỉnh sửa điểm đến</h2>
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
            Lưu thay đổi
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditDestination;
