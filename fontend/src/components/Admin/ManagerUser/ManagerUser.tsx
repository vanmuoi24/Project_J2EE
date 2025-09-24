import React, { useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Modal, Form, message } from "antd";
import { ProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";
import ModelEdit from "./ModelEdit";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const ManagerUser: React.FC = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // demo data
  const [data, setData] = useState<User[]>([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "a@gmail.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "b@gmail.com",
      role: "User",
      status: "Inactive",
    },
  ]);

  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  // filter
  const filteredData = data.filter(
    (u) =>
      u.name.toLowerCase().includes(searchName.toLowerCase()) &&
      u.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  // delete
  const handleDelete = (id: number) => {
    setData(data.filter((u) => u.id !== id));
    message.success("Xóa user thành công");
  };

  // columns
  const columns: ProColumns<User>[] = [
    {
      title: "STT",
      key: "index",
      width: 60,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    { title: "Họ và Tên", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Vai trò", dataIndex: "role" },
    { title: "Trạng thái", dataIndex: "status" },
    {
      title: "Hành động",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space>
          <EyeOutlined style={{ color: "#faad14", fontSize: 18 }} />
          <EditOutlined
            style={{ color: "#1890ff", fontSize: 18 }}
            onClick={() => {
              setEditingUser(record);
              setOpenEdit(true);
            }}
          />
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
          >
            <DeleteOutlined style={{ color: "#ff4d4f", fontSize: 18 }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Search */}
      <div
        style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}
      >
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
        toolBarRender={() => [
          <Button
            key="create"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpenAdd(true)}
          >
            Thêm mới
          </Button>,
        ]}
        pagination={{
          pageSize: 5,
          showTotal: (total, range) =>
            `Hiển thị ${range[0]}-${range[1]} trong tổng số ${total} mục`,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />

      {/* Modal Add */}
      <Modal
        title="Thêm người dùng"
        open={openAdd}
        onCancel={() => setOpenAdd(false)}
        onOk={() => setOpenAdd(false)}
        destroyOnClose
        maskClosable={false}
        centered
        getContainer={false}
        mask={true}
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <Form layout="vertical">
          <Form.Item label="Họ và tên">
            <Input />
          </Form.Item>
          <Form.Item label="Email">
            <Input />
          </Form.Item>
          <Form.Item label="Vai trò">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Edit */}
      <ModelEdit
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        editingUser={editingUser}
      />
    </div>
  );
};

export default ManagerUser;
