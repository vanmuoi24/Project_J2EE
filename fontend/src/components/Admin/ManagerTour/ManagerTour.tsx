import React, { useState } from "react";
import { ProTable, type ProColumns } from "@ant-design/pro-components";
import { Button, Popconfirm, Space, Tag, message } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";

// Dữ liệu mẫu
interface Tour {
  id: number;
  name: string;
  destination: string;
  price: number;
  startDate: string;
  endDate: string;
  status: "Hoạt động" | "Ngừng";
}

const ManagerTourList: React.FC = () => {
  const [dataSource, setDataSource] = useState<Tour[]>([
    {
      id: 1,
      name: "Tour Đà Nẵng 3N2Đ",
      destination: "Đà Nẵng",
      price: 3500000,
      startDate: "2025-10-01",
      endDate: "2025-10-03",
      status: "Hoạt động",
    },
    {
      id: 2,
      name: "Tour Hạ Long 2N1Đ",
      destination: "Quảng Ninh",
      price: 2500000,
      startDate: "2025-11-10",
      endDate: "2025-11-11",
      status: "Ngừng",
    },
  ]);

  const handleDelete = (id: number) => {
    setDataSource(dataSource.filter((item) => item.id !== id));
    message.success("Xóa tour thành công!");
  };

  const columns: ProColumns<Tour>[] = [
    {
      title: "Tên Tour",
      dataIndex: "name",
      key: "name",
      copyable: true,
      ellipsis: true,
      width: 220,
    },
    {
      title: "Điểm đến",
      dataIndex: "destination",
      key: "destination",
      width: 160,
    },
    {
      title: "Giá (VNĐ)",
      dataIndex: "price",
      key: "price",
      valueType: "money",
      width: 150,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      valueType: "date",
      width: 140,
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      valueType: "date",
      width: 140,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      valueEnum: {
        Hoạt: { text: "Hoạt động", status: "Success" },
        Ngừng: { text: "Ngừng", status: "Default" },
      },
      render: (_, record) => (
        <Tag color={record.status === "Hoạt động" ? "green" : "red"}>
          {record.status}
        </Tag>
      ),
      width: 120,
    },
    {
      title: "Hành động",
      key: "action",
      valueType: "option",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => message.info(`Xem chi tiết tour: ${record.name}`)}
          />
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => message.info(`Chỉnh sửa tour: ${record.name}`)}
          />
          <Popconfirm
            title="Bạn có chắc muốn xóa tour này?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <ProTable<Tour>
      headerTitle="Danh sách Tour Du Lịch"
      rowKey="id"
      columns={columns}
      dataSource={dataSource}
      search={{
        labelWidth: "auto",
      }}
      pagination={{
        pageSize: 5,
      }}
      toolBarRender={() => [
        <Button key="add" type="primary" icon={<PlusOutlined />}>
          Thêm Tour
        </Button>,
      ]}
    />
  );
};

export default ManagerTourList;
