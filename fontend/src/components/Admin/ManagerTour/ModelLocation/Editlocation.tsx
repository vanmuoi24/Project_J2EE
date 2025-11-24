import React, { useEffect } from 'react';
import { Form, Input, Button, Select, Card } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const { Option } = Select;

interface EditLocationProps {
  data?: any;
  onSubmit?: (values: any) => void;
}

const EditLocation: React.FC<EditLocationProps> = ({ data, onSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        type: data.type,
        country: data.country,
        city: data.city,
        description: data.description,
      });
    } else {
      form.resetFields();
    }
  }, [data, form]);

  const handleFinish = (values: any) => {
    if (onSubmit) onSubmit(values);
  };

  return (
    <Card
      title="Chỉnh sửa Điểm Đến"
      bordered={false}
      style={{
        maxWidth: 600,
        margin: '0 auto',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderRadius: 12,
      }}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Thành phố"
          name="city"
          rules={[{ required: true, message: 'Vui lòng nhập thành phố' }]}
        >
          <Input placeholder="Nhập thành phố" size="large" />
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
        <Form.Item style={{ textAlign: 'center', marginTop: 24 }}>
          <Button 
            type="primary" 
            icon={<SaveOutlined />} 
            htmlType="submit" 
            size="large" 
            style={{ minWidth: 160 }}
          >
            Cập nhật Điểm Đến
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditLocation;