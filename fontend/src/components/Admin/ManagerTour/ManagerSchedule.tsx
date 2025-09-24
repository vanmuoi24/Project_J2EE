import React, { useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Popconfirm,
  Space,
  Modal,
  Form,
  DatePicker,
  Select,
  message,
  Tag,
} from "antd";
import { ProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";

interface Schedule {
  id: number;
  tourName: string;
  customerName: string;
  date: string;
  status: "pending" | "confirmed" | "canceled";
}

const ManagerSchedule: React.FC = () => {
  const [data, setData] = useState<Schedule[]>([
    {
      id: 1,
      tourName: "Tour Hạ Long",
      customerName: "Nguyễn Văn A",
      date: "2025-09-20",
      status: "pending",
    },
    {
      id: 2,
      tourName: "Tour Đà Nẵng",
      customerName: "Trần Thị B",
      date: "2025-09-21",
      status: "confirmed",
    },
    {
      id: 3,
      tourName: "Tour Phú Quốc",
      customerName: "Lê Văn C",
      date: "2025-09-22",
      status: "canceled",
    },
  ]);

  const [searchTour, setSearchTour] = useState("");
  const [searchCustomer, setSearchCustomer] = useState("");

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);

  // lọc dữ liệu
  const filteredData = data.filter(
    (d) =>
      d.tourName.toLowerCase().includes(searchTour.toLowerCase()) &&
      d.customerName.toLowerCase().includes(searchCustomer.toLowerCase())
  );

  // xóa
  const handleDelete = (id: number) => {
    setData(data.filter((d) => d.id !== id));
    message.success("Xóa lịch thành công");
  };

  // cột
  const columns: ProColumns<Schedule>[] = [
    {
      title: "STT",
      key: "index",
      width: 60,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên tour",
      dataIndex: "tourName",
    },
    {
      title: "Khách hàng",
      dataIndex: "customerName",
    },
    {
      title: "Ngày",
      dataIndex: "date",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (_, record) => {
        if (record.status === "pending") return <Tag color="orange">Chờ</Tag>;
        if (record.status === "confirmed")
          return <Tag color="green">Xác nhận</Tag>;
        return <Tag color="red">Hủy</Tag>;
      },
    },
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
              setEditingSchedule(record);
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
          placeholder="Tìm theo tour"
          value={searchTour}
          onChange={(e) => setSearchTour(e.target.value)}
          style={{ width: 200 }}
        />
        <Input
          placeholder="Tìm theo khách hàng"
          value={searchCustomer}
          onChange={(e) => setSearchCustomer(e.target.value)}
          style={{ width: 200 }}
        />
        <Button icon={<SearchOutlined />} type="primary">
          Tìm kiếm
        </Button>
      </div>

      {/* Table */}
      <ProTable<Schedule>
        columns={columns}
        rowKey="id"
        dataSource={filteredData}
        search={false}
        headerTitle="Danh sách lịch trình"
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
        }}
      />

      {/* Modal Add */}
      <Modal
        title="Thêm lịch trình"
        open={openAdd}
        onCancel={() => setOpenAdd(false)}
        onOk={() => setOpenAdd(false)}
        destroyOnClose
        centered
      >
        <Form layout="vertical">
          <Form.Item label="Tên tour">
            <Input />
          </Form.Item>
          <Form.Item label="Khách hàng">
            <Input />
          </Form.Item>
          <Form.Item label="Ngày">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Trạng thái">
            <Select
              options={[
                { value: "pending", label: "Chờ xác nhận" },
                { value: "confirmed", label: "Đã xác nhận" },
                { value: "canceled", label: "Đã hủy" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Edit */}
      <Modal
        title="Chỉnh sửa lịch trình"
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        onOk={() => setOpenEdit(false)}
        destroyOnClose
        centered
      >
        <Form layout="vertical" initialValues={editingSchedule || {}}>
          <Form.Item label="Tên tour" name="tourName">
            <Input />
          </Form.Item>
          <Form.Item label="Khách hàng" name="customerName">
            <Input />
          </Form.Item>
          <Form.Item label="Ngày" name="date">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Trạng thái" name="status">
            <Select
              options={[
                { value: "pending", label: "Chờ xác nhận" },
                { value: "confirmed", label: "Đã xác nhận" },
                { value: "canceled", label: "Đã hủy" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerSchedule;
