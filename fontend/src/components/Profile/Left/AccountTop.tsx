import type { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
import { UserOutlined } from '@ant-design/icons';
import { Card, Avatar } from 'antd';

const AccountTop = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  return (
    <Card className="flex items-center gap-4 shadow-md rounded-2xl">
      <Avatar size={80} icon={<UserOutlined />} />
      <div>
        <h2 className="text-xl font-bold text-[#0b5da7] !mt-3">{user?.username}</h2>
        <p className="text-gray-600 text-sm">{user?.email}</p>
      </div>
    </Card>
  );
};

export default AccountTop;
