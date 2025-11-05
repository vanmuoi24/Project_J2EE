import type { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { LockOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import ModalChangePW from './ModalChangePW';
import type { IUserUpdate } from '@/types/User';
import { uploadProfile } from '@/store/slices/authSlice';

const Info = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        file: null,
      });
    }
  }, [user, form]);

  const onFinish = async (values: IUserUpdate) => {
    try {
      const updatedUser = await dispatch(
        uploadProfile({ data: values, userId: user?.id })
      ).unwrap();
      console.log(updatedUser);
      message.success('Cập nhật thông tin thành công!');
      form.setFieldsValue(updatedUser);
    } catch (error: any) {
      message.error(error.message || 'Cập nhật thất bại.');
    }
  };

  return (
    <div className="!space-y-4">
      <h3 className="text-xl font-semibold">Thông tin tài khoản</h3>

      {/* 6. Chuyển sang dùng Form */}
      <Form form={form} layout="vertical" onFinish={onFinish} className="!max-w-md">
        <Form.Item label="Email" name="email">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Username" name="username">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Số điện thoại" name="phone">
          <Input />
        </Form.Item>

        <Form.Item label="Địa chỉ" name="address">
          <Input />
        </Form.Item>

        <Form.Item className="!mt-4">
          <div className="flex gap-2">
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={isUpdating}>
              Lưu thay đổi
            </Button>
            <Button icon={<LockOutlined />} onClick={() => setOpenModal(true)}>
              Đổi mật khẩu
            </Button>
          </div>
        </Form.Item>
      </Form>

      <ModalChangePW visible={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Info;
