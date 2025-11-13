import React from 'react';
import { Form, Input, InputNumber, Button, Select, Upload, message, Space, Card } from 'antd';
import { UploadOutlined, SaveOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const AddNewTour: React.FC = () => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    console.log('✅ Dữ liệu tour mới:', values);
    message.success('(Demo) Đã tạo tour mới!');
    form.resetFields();
  };

  return (
    <Card
      title="Thêm Tour Mới"
      bordered={false}
      style={{
        maxWidth: 800,
        margin: '0 auto',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderRadius: 12,
      }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        initialValues={{
          duration: 3,
          basePrice: 3000000,
          vehicle: 'Xe du lịch',
        }}
      >
        <Form.Item
          label="Tên tour"
          name="tourTitle"
          rules={[{ required: true, message: 'Vui lòng nhập tên tour!' }]}
        >
          <Input placeholder="VD: Hành trình miền Trung di sản" />
        </Form.Item>

        <Form.Item
          label="Chương trình tour"
          name="tourProgram"
          rules={[{ required: true, message: 'Vui lòng nhập chương trình!' }]}
        >
          <Input placeholder="VD: Đà Nẵng - Hội An - Huế" />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <TextArea rows={3} placeholder="Giới thiệu ngắn gọn về tour..." />
        </Form.Item>

        <Space size="large" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Form.Item
            label="Điểm khởi hành"
            name="departure"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Chọn điểm khởi hành!' }]}
          >
            <Select placeholder="Chọn điểm đi">
              <Option value="Hà Nội">Hà Nội</Option>
              <Option value="TP.HCM">TP.HCM</Option>
              <Option value="Đà Nẵng">Đà Nẵng</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Điểm đến"
            name="destination"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Chọn điểm đến!' }]}
          >
            <Select placeholder="Chọn điểm đến">
              <Option value="Sapa">Sapa</Option>
              <Option value="Phú Quốc">Phú Quốc</Option>
              <Option value="Huế">Huế</Option>
            </Select>
          </Form.Item>
        </Space>

        <Space size="large" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Form.Item
            label="Phương tiện"
            name="vehicle"
            style={{ flex: 1 }}
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn phương tiện">
              <Option value="Xe du lịch">Xe du lịch</Option>
              <Option value="Xe giường nằm">Xe giường nằm</Option>
              <Option value="Máy bay">Máy bay</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Thời lượng (ngày)" name="duration" style={{ flex: 1 }}>
            <InputNumber min={1} max={30} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Giá cơ bản (VNĐ)" name="basePrice" style={{ flex: 1 }}>
            <InputNumber
              min={1000000}
              step={500000}
              style={{ width: '100%' }}
              formatter={(val) => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </Form.Item>
        </Space>

        <Form.Item label="Hình ảnh tour" name="images">
          <Upload listType="picture" beforeUpload={() => false} multiple>
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        <Form.Item style={{ textAlign: 'center', marginTop: 24 }}>
          <Button type="primary" icon={<SaveOutlined />} htmlType="submit">
            Lưu Tour
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddNewTour;
