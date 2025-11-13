import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, Select, Row, Col } from 'antd';

const { TextArea } = Input;

interface EditTourProps {
  data?: any; // dữ liệu tour khi edit
  isEdit?: boolean; // true nếu là edit
  onSubmit?: (values: any) => void;
}

const EditTour: React.FC<EditTourProps> = ({ data, isEdit = false, onSubmit }) => {
  const [form] = Form.useForm();

  // Khi modal mở, tự điền dữ liệu
  useEffect(() => {
    if (isEdit && data) {
      form.setFieldsValue({
        tourTitle: data.tourTitle,
        tourProgram: data.tourProgram,
        description: data.description,
        duration: data.duration,
        basePrice: data.basePrice,
        departureName: data.departureName,
        destinationName: data.destinationName,
        vehicleName: data.vehicleName,
      });
    } else {
      form.resetFields();
    }
  }, [data, isEdit, form]);

  const handleFinish = (values: any) => {
    console.log('Form submit:', values);
    if (onSubmit) onSubmit(values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Tên tour"
            name="tourTitle"
            rules={[{ required: true, message: 'Vui lòng nhập tên tour' }]}
          >
            <Input placeholder="Nhập tên tour" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Chương trình"
            name="tourProgram"
            rules={[{ required: true, message: 'Vui lòng nhập chương trình' }]}
          >
            <Input placeholder="Ví dụ: Hà Nội - Hạ Long - Sapa" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Mô tả" name="description">
        <TextArea rows={3} placeholder="Nhập mô tả tour" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="Thời lượng (ngày)"
            name="duration"
            rules={[{ required: true, message: 'Vui lòng nhập thời lượng' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Giá cơ bản (VNĐ)"
            name="basePrice"
            rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Phương tiện"
            name="vehicleName"
            rules={[{ required: true, message: 'Vui lòng chọn phương tiện' }]}
          >
            <Select placeholder="Chọn phương tiện">
              <Select.Option value="Xe du lịch">Xe du lịch</Select.Option>
              <Select.Option value="Xe giường nằm">Xe giường nằm</Select.Option>
              <Select.Option value="Máy bay">Máy bay</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Điểm đi"
            name="departureName"
            rules={[{ required: true, message: 'Vui lòng nhập điểm đi' }]}
          >
            <Input placeholder="Nhập điểm đi" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Điểm đến"
            name="destinationName"
            rules={[{ required: true, message: 'Vui lòng nhập điểm đến' }]}
          >
            <Input placeholder="Nhập điểm đến" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item style={{ textAlign: 'right' }}>
        <Button type="primary" htmlType="submit">
          {isEdit ? 'Lưu thay đổi' : 'Thêm tour'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditTour;
