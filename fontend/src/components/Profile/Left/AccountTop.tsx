import type { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { uploadProfile } from '@/store/slices/authSlice';
import type { IUserUpdate } from '@/types/User';
import { CameraOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Avatar, message, Tooltip, Upload } from 'antd';
import type { UploadProps } from 'antd/lib';

const AccountTop = () => {
  const { user, loading } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Bạn chỉ có thể upload file JPG/PNG!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Hình ảnh phải nhỏ hơn 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleUpload: UploadProps['customRequest'] = async (options) => {
    const { file } = options;
    const data: IUserUpdate = {
      username: user?.username,
      file: file as File,
      phone: user?.phone,
      address: user?.address,
    };
    const fileBeforeUpdate = file as File;
    const isJpgOrPng =
      fileBeforeUpdate.type === 'image/jpeg' || fileBeforeUpdate.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Bạn chỉ có thể upload file JPG/PNG!');
      return;
    }
    const isLt2M = fileBeforeUpdate.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Hình ảnh phải nhỏ hơn 2MB!');
      return;
    }

    try {
      await dispatch(uploadProfile({ data, userId: user?.id })).unwrap();

      message.success('Cập nhật avatar thành công!');
    } catch (error: any) {
      message.error(error.message || 'Upload thất bại.');
    }
  };

  return (
    <Card className="flex items-center gap-4 shadow-md rounded-2xl">
      <Tooltip title="Nhấp để đổi avatar" placement="bottom">
        <Upload
          name="avatar"
          showUploadList={false}
          beforeUpload={beforeUpload}
          customRequest={handleUpload}
        >
          <div className="relative group cursor-pointer">
            <Avatar
              size={80}
              src={user?.avatar}
              icon={loading ? <LoadingOutlined /> : <UserOutlined />}
              className="border-2 border-gray-200"
            />
            {!loading && (
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <CameraOutlined className="!text-white text-2xl" />
              </div>
            )}
          </div>
        </Upload>
      </Tooltip>

      <div>
        <h2 className="text-xl font-bold text-[#0b5da7] !mt-3">{user?.username}</h2>
        {/* <p className="text-gray-600 text-sm">{user?.email}</p> */}
      </div>
    </Card>
  );
};

export default AccountTop;
