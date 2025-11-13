'use client';
import React, { useRef, useState } from 'react';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { Button, Space, Tag, Popconfirm, Modal, Form, Input, Select, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

interface Role {
  role_id: number;
  name: string;
  description?: string;
  permissions: string[];
  status: 'active' | 'inactive';
}

const tourPermissions = [
  'Thêm Tour',
  'Sửa Tour',
  'Xóa Tour',
  'Xem Tour',
  'Quản lý Lịch trình',
  'Quản lý Địa điểm',
];

const ManagerRoleTour: React.FC = () => {
  const actionRef = useRef<ActionType>(null);

  const [data, setData] = useState<Role[]>([
    {
      role_id: 1,
      name: 'Quản trị viên Tour',
      description: 'Toàn quyền quản lý Tour và các tính năng liên quan',
      permissions: tourPermissions,
      status: 'active',
    },
    {
      role_id: 2,
      name: 'Nhân viên Tour',
      description: 'Chỉ quản lý Tour và lịch trình',
      permissions: ['Thêm Tour', 'Sửa Tour', 'Xem Tour', 'Quản lý Lịch trình'],
      status: 'active',
    },
  ]);

  const [openAddEdit, setOpenAddEdit] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((r) => r.role_id !== id));
    message.success('Xóa vai trò thành công');
  };

  const handleSubmit = (values: any) => {
    if (editingRole) {
      setData((prev) =>
        prev.map((r) => (r.role_id === editingRole.role_id ? { ...r, ...values } : r))
      );
      message.success('Cập nhật vai trò thành công');
    } else {
      const newRole: Role = {
        role_id: Date.now(),
        ...values,
      };
      setData((prev) => [...prev, newRole]);
      message.success('Thêm vai trò thành công');
    }
    setOpenAddEdit(false);
    setEditingRole(null);
  };

  const columns: ProColumns<Role>[] = [
    { title: 'Tên vai trò', dataIndex: 'name', width: 180, render: (text) => <b>{text}</b> },
    { title: 'Mô tả', dataIndex: 'description', ellipsis: true },
    {
      title: 'Quyền hạn',
      dataIndex: 'permissions',
      render: (_, record) =>
        record.permissions.map((p, i) => (
          <Tag key={i} color="blue" style={{ marginBottom: 4 }}>
            {p}
          </Tag>
        )),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 120,
      render: (_, record) =>
        record.status === 'active' ? (
          <Tag color="green">Hoạt động</Tag>
        ) : (
          <Tag color="red">Ngưng</Tag>
        ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <EditOutlined
            style={{ color: '#1677ff', fontSize: 18, cursor: 'pointer' }}
            onClick={() => {
              setEditingRole(record);
              setOpenAddEdit(true);
            }}
          />
          <Popconfirm
            title="Bạn có chắc muốn xóa vai trò này?"
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={() => handleDelete(record.role_id)}
          >
            <DeleteOutlined style={{ color: '#ff4d4f', fontSize: 18, cursor: 'pointer' }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <ProTable<Role>
        headerTitle="Quản lý vai trò Tour"
        columns={columns}
        dataSource={data}
        rowKey="role_id"
        search={false}
        pagination={{ pageSize: 5 }}
        actionRef={actionRef}
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingRole(null);
              setOpenAddEdit(true);
            }}
          >
            Thêm vai trò
          </Button>,
        ]}
      />

      <Modal
        title={editingRole ? 'Chỉnh sửa vai trò' : 'Thêm vai trò mới'}
        open={openAddEdit}
        onCancel={() => setOpenAddEdit(false)}
        footer={null}
        destroyOnClose
        centered
        width={600}
      >
        <Form
          layout="vertical"
          initialValues={editingRole || { status: 'active', permissions: [] }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Tên vai trò"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên vai trò' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Quyền hạn"
            name="permissions"
            rules={[{ required: true, message: 'Vui lòng chọn ít nhất 1 quyền' }]}
          >
            <Select
              mode="multiple"
              options={tourPermissions.map((p) => ({ value: p, label: p }))}
            />
          </Form.Item>

          <Form.Item label="Trạng thái" name="status">
            <Select
              options={[
                { value: 'active', label: 'Hoạt động' },
                { value: 'inactive', label: 'Ngưng' },
              ]}
            />
          </Form.Item>

          <Form.Item style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              {editingRole ? 'Lưu thay đổi' : 'Thêm vai trò'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerRoleTour;
