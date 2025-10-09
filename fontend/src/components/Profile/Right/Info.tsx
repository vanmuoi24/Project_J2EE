import type { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
import { LockOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import ModalChangePW from './ModalChangePW';

const Info = () => {
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.auth);

  return (
    <div className="!space-y-4">
      <h3 className="text-xl font-semibold">Thông tin tài khoản</h3>
      <p>
        <strong>Username:</strong> {user?.username || 'Unknown'}
      </p>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      <p>
        <strong>Số điện thoại:</strong> +84 123 456 789
      </p>
      <div className="!mt-4 flex gap-2">
        <Button type="primary" icon={<LockOutlined />} onClick={() => setOpenModal(true)}>
          Đổi mật khẩu
        </Button>
      </div>
      <ModalChangePW visible={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Info;
