import React from "react";
import { ProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";
import { Tag } from "antd";

interface Booking {
  id: number;
  customerName: string;
  tourName: string;
  bookingDate: string;
  people: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "canceled";
}

const ManagerBooking: React.FC = () => {
  const columns: ProColumns<Booking>[] = [
    {
      title: "Mã đặt chỗ",
      dataIndex: "id",
      valueType: "indexBorder",
      width: 80,
    },
    {
      title: "Khách hàng",
      dataIndex: "customerName",
      ellipsis: true,
    },
    {
      title: "Tour",
      dataIndex: "tourName",
    },
    {
      title: "Ngày đặt",
      dataIndex: "bookingDate",
      valueType: "date",
    },
    {
      title: "Số người",
      dataIndex: "people",
      valueType: "digit",
      width: 100,
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      valueType: "money",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      valueType: "select",
      valueEnum: {
        pending: { text: "Chờ xác nhận", status: "Default" },
        confirmed: { text: "Đã xác nhận", status: "Success" },
        canceled: { text: "Đã hủy", status: "Error" },
      },
      render: (_, record) => {
        if (record.status === "pending")
          return <Tag color="orange">Chờ xác nhận</Tag>;
        if (record.status === "confirmed")
          return <Tag color="green">Đã xác nhận</Tag>;
        return <Tag color="red">Đã hủy</Tag>;
      },
    },
  ];

  // Fake data demo
  const dataSource: Booking[] = [
    {
      id: 1,
      customerName: "Nguyễn Văn A",
      tourName: "Tour Hạ Long",
      bookingDate: "2025-09-20",
      people: 2,
      totalPrice: 5000000,
      status: "pending",
    },
    {
      id: 2,
      customerName: "Trần Thị B",
      tourName: "Tour Đà Nẵng",
      bookingDate: "2025-09-21",
      people: 4,
      totalPrice: 12000000,
      status: "confirmed",
    },
    {
      id: 3,
      customerName: "Lê Văn C",
      tourName: "Tour Phú Quốc",
      bookingDate: "2025-09-22",
      people: 3,
      totalPrice: 9000000,
      status: "canceled",
    },
  ];

  return (
    <ProTable<Booking>
      headerTitle="Quản lý đặt chỗ"
      columns={columns}
      dataSource={dataSource}
      rowKey="id"
      search={false}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default ManagerBooking;
