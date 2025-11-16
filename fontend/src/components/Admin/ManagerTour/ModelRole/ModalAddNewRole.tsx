'use client';
import React, { useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Collapse,
  Switch,
  Tag,
  Typography,
  Divider,
  Space,
  Row,
  Col,
} from 'antd';

const { Panel } = Collapse;
const { Text } = Typography;

interface PermissionItem {
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  enabled: boolean;
}

interface PermissionGroup {
  group: string;
  permissions: PermissionItem[];
}

interface ModalAddNewRoleProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const ModalAddNewRole: React.FC<ModalAddNewRoleProps> = ({ open, setOpen }) => {
  const [form] = Form.useForm();

  // Dữ liệu mẫu nhóm quyền
  const [permissions, setPermissions] = useState<PermissionGroup[]>([
    {
      group: 'Quản lý người dùng',
      permissions: [
        {
          name: 'Xem danh sách người dùng',
          method: 'GET',
          path: '/api/v1/users',
          enabled: false,
        },
        {
          name: 'Tạo người dùng mới',
          method: 'POST',
          path: '/api/v1/users',
          enabled: false,
        },
        {
          name: 'Cập nhật người dùng',
          method: 'PUT',
          path: '/api/v1/users/:id',
          enabled: false,
        },
        {
          name: 'Xóa người dùng',
          method: 'DELETE',
          path: '/api/v1/users/:id',
          enabled: false,
        },
      ],
    },
    {
      group: 'Quản lý khách hàng',
      permissions: [
        {
          name: 'Xem danh sách khách hàng',
          method: 'GET',
          path: '/api/v1/customers',
          enabled: false,
        },
        {
          name: 'Thêm khách hàng',
          method: 'POST',
          path: '/api/v1/customers',
          enabled: false,
        },
        {
          name: 'Cập nhật thông tin khách hàng',
          method: 'PUT',
          path: '/api/v1/customers/:id',
          enabled: false,
        },
        {
          name: 'Xóa khách hàng',
          method: 'DELETE',
          path: '/api/v1/customers/:id',
          enabled: false,
        },
      ],
    },
    {
      group: 'Quản lý sản phẩm',
      permissions: [
        {
          name: 'Xem danh sách sản phẩm',
          method: 'GET',
          path: '/api/v1/products',
          enabled: false,
        },
        {
          name: 'Thêm sản phẩm',
          method: 'POST',
          path: '/api/v1/products',
          enabled: false,
        },
        {
          name: 'Cập nhật sản phẩm',
          method: 'PUT',
          path: '/api/v1/products/:id',
          enabled: false,
        },
        {
          name: 'Xóa sản phẩm',
          method: 'DELETE',
          path: '/api/v1/products/:id',
          enabled: false,
        },
      ],
    },
    {
      group: 'Quản lý đơn hàng',
      permissions: [
        {
          name: 'Xem danh sách đơn hàng',
          method: 'GET',
          path: '/api/v1/orders',
          enabled: false,
        },
        {
          name: 'Tạo đơn hàng mới',
          method: 'POST',
          path: '/api/v1/orders',
          enabled: false,
        },
        {
          name: 'Cập nhật đơn hàng',
          method: 'PUT',
          path: '/api/v1/orders/:id',
          enabled: false,
        },
        {
          name: 'Hủy đơn hàng',
          method: 'DELETE',
          path: '/api/v1/orders/:id',
          enabled: false,
        },
      ],
    },
    {
      group: 'Báo cáo & thống kê',
      permissions: [
        {
          name: 'Xem báo cáo doanh thu',
          method: 'GET',
          path: '/api/v1/reports/revenue',
          enabled: false,
        },
        {
          name: 'Xem báo cáo tồn kho',
          method: 'GET',
          path: '/api/v1/reports/inventory',
          enabled: false,
        },
        {
          name: 'Xuất báo cáo PDF',
          method: 'POST',
          path: '/api/v1/reports/export',
          enabled: false,
        },
      ],
    },
  ]);
  // Xử lý toggle quyền
  const togglePermission = (groupIndex: number, permIndex: number, checked: boolean) => {
    setPermissions((prev) =>
      prev.map((g, gi) =>
        gi === groupIndex
          ? {
              ...g,
              permissions: g.permissions.map((p, pi) =>
                pi === permIndex ? { ...p, enabled: checked } : p
              ),
            }
          : g
      )
    );
  };

  // Lưu vai trò
  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const activePermissions = permissions.flatMap((g) => g.permissions.filter((p) => p.enabled));
      console.log('Vai trò mới:', {
        ...values,
        permissions: activePermissions,
      });
      setOpen(false);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Thêm vai trò mới"
      open={open}
      onCancel={() => setOpen(false)}
      onOk={handleSubmit}
      width={800}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form layout="vertical" form={form}>
        <Row gutter={16} align="middle">
          {/* Tên vai trò */}
          <Col span={16}>
            <Form.Item
              label="Tên vai trò"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên vai trò' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              style={{ marginBottom: 0 }}
            >
              <Input placeholder="Nhập tên vai trò, ví dụ: Quản trị viên" />
            </Form.Item>
          </Col>

          {/* Trạng thái */}
          <Col span={8}>
            <Form.Item
              label="Trạng thái"
              name="active"
              valuePropName="checked"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ marginBottom: 0 }}
            >
              <Switch checkedChildren="Hoạt động" unCheckedChildren="Ngưng" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="description" label="Mô tả">
          <Input.TextArea placeholder="Mô tả quyền hạn hoặc mục đích vai trò này" />
        </Form.Item>

        <Divider />
        <h4>Quyền hạn</h4>
        <Collapse accordion>
          {permissions.map((group, gi) => (
            <Panel header={group.group} key={group.group}>
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 12,
                  }}
                >
                  {group.permissions.map((perm, pi) => (
                    <div
                      key={pi}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: '#fafafa',
                        borderRadius: 8,
                        padding: '8px 12px',
                        border: '1px solid #f0f0f0',
                      }}
                    >
                      <div>
                        <Text strong>{perm.name}</Text>
                        <div
                          style={{
                            fontSize: 14,
                            color: '#888',
                          }}
                        >
                          <Tag
                            color={
                              perm.method === 'GET'
                                ? 'blue'
                                : perm.method === 'POST'
                                  ? 'green'
                                  : perm.method === 'PUT'
                                    ? 'orange'
                                    : 'red'
                            }
                            style={{
                              marginRight: 8,
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              letterSpacing: 0.5,
                            }}
                          >
                            {perm.method}
                          </Tag>
                          {perm.path}
                        </div>
                      </div>

                      <Switch
                        checked={perm.enabled}
                        onChange={(checked) => togglePermission(gi, pi, checked)}
                      />
                    </div>
                  ))}
                </div>
              </Space>
            </Panel>
          ))}
        </Collapse>
      </Form>
    </Modal>
  );
};

export default ModalAddNewRole;
