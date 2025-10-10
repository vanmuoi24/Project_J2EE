import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal } from 'antd';
import { useState } from 'react';

interface IProps {
  visible: boolean;
  onClose: () => void;
}

const ModalChangePW = ({ visible, onClose }: IProps) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // Gọi API đổi mật khẩu
      console.log('Form values:', values);
      // Ví dụ: await axios.post('/api/change-password', values)

      message.success('Đổi mật khẩu thành công!');
      onClose();
    } catch (error) {
      message.error('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Đổi mật khẩu"
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnClose
    >
      <Form layout="vertical" onFinish={handleSubmit} className="!space-y-4">
        <Form.Item
          label="Mật khẩu cũ"
          name="currentPassword"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu cũ" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu mới" />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu mới"
          name="confirmPassword"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Vui lòng xác nhận mật khẩu mới' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu xác nhận không khớp'));
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu mới" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalChangePW;
