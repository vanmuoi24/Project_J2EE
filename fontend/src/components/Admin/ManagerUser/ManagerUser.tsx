'use client';
import React, { useEffect, useState } from 'react';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { Button, Input, Space, Modal, Descriptions } from 'antd';
import { PlusOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { getListUser } from '@/services/userServices';

// ================== TYPES ==================
interface User {
  id: number;
  username: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  status: 'Active' | 'Inactive';
}

// ================== MAIN COMPONENT ==================
const ManagerUser: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');

  // modal xem chi tiết
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewUser, setViewUser] = useState<User | null>(null);

  // ================== FETCH DATA ==================
  const fetchData = async () => {
    let res = await getListUser();
    if (res && res.code === 1000) {
      setData(res.result);
    } else {
      // fake data nếu chưa có API
      setData([
        {
          id: 1,
          username: 'Nguyễn Văn A',
          email: 'vana@gmail.com',
          phone: '0123456789',
          address: 'Hà Nội',
          status: 'Active',
          avatar: 'https://i.pravatar.cc/100?img=1',
        },
        {
          id: 2,
          username: 'Trần Thị B',
          email: 'thib@gmail.com',
          phone: '0987654321',
          address: 'TP.HCM',
          status: 'Inactive',
          avatar: 'https://i.pravatar.cc/100?img=2',
        },
      ]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================== FILTER ==================
  const filteredData = data.filter(
    (u) =>
      u.username.toLowerCase().includes(searchName.toLowerCase()) &&
      u.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  // ================== COLUMNS ==================
  const columns: ProColumns<User>[] = [
    {
      title: 'STT',
      key: 'index',
      width: 60,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      render: (_, record) =>
        record.avatar ? (
          <img
            src={record.avatar}
            alt="avatar"
            style={{ width: 40, height: 40, borderRadius: '50%' }}
          />
        ) : (
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#ccc' }} />
        ),
    },
    { title: 'Họ và tên', dataIndex: 'username' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Phone', dataIndex: 'phone' },
    { title: 'Địa chỉ', dataIndex: 'address' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (_, record) =>
        record.status === 'Active' ? (
          <span style={{ color: 'green' }}>Active</span>
        ) : (
          <span style={{ color: 'red' }}>Inactive</span>
        ),
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: 100,
      render: (_, record) => (
        <Space>
          <EyeOutlined
            style={{ color: '#faad14', fontSize: 18, cursor: 'pointer' }}
            onClick={() => {
              setViewUser(record);
              setViewModalOpen(true);
            }}
          />
        </Space>
      ),
    },
  ];

  // ================== RETURN ==================
  return (
    <div>
      {/* Search */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
        <Input
          placeholder="Tìm theo tên"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ width: 200 }}
        />
        <Input
          placeholder="Tìm theo email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          style={{ width: 200 }}
        />
        <Button icon={<SearchOutlined />} type="primary">
          Tìm kiếm
        </Button>
      </div>

      {/* Table */}
      <ProTable<User>
        columns={columns}
        rowKey="id"
        dataSource={filteredData}
        search={false}
        headerTitle="Danh sách người dùng"
        pagination={{ pageSize: 5 }}
        toolBarRender={() => [
          <Button key="add" type="primary" icon={<PlusOutlined />}>
            Thêm mới
          </Button>,
        ]}
      />

      {/* Modal xem chi tiết */}
      <Modal
        open={viewModalOpen}
        title="Chi tiết người dùng"
        onCancel={() => setViewModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalOpen(false)}>
            Đóng
          </Button>,
        ]}
      >
        {viewUser && (
          <div style={{ textAlign: 'center' }}>
            <img
              src={viewUser.avatar}
              alt="avatar"
              style={{ width: 100, height: 100, marginBottom: 16 }}
            />
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Họ và tên">{viewUser.username}</Descriptions.Item>
              <Descriptions.Item label="Email">{viewUser.email}</Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">{viewUser.phone || '—'}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">{viewUser.address || '—'}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                {viewUser.status === 'Active' ? (
                  <span style={{ color: 'green' }}>Đang hoạt động</span>
                ) : (
                  <span style={{ color: 'red' }}>Ngưng hoạt động</span>
                )}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ManagerUser;
