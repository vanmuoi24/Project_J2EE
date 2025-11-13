import React, { useEffect, useState } from "react";
import { ProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";
import { Tag, Modal, Descriptions } from "antd";

import type { BookingResponse } from "@/types/Booking";
import type { InvoiceResponse } from "@/types/Invoice";
import type { UserResponse } from "@/types/comment";
import bookingServices from "@/services/bookingServices";
import invoiceServices from "@/services/invoiceServices";
import { getAllUsers } from "@/services/userServices";
import { getTourDepartureById } from "@/services/tourServices"; // giả sử có API này
import { formatCurrencyVND } from "@/utils";

type BookingWithInvoice = BookingResponse & {
  invoiceId?: number | null;
  invoiceAmount?: string | null;
  paymentMethod?: string | null;
  invoiceStatus?: string | null;
  userName?: string | null;
  tour?: {
    name: string;
    startDate: string;
  };
};

const ManagerInvoice: React.FC = () => {
  const [data, setData] = useState<BookingWithInvoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingWithInvoice | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (record: BookingWithInvoice) => {
    setSelectedBooking(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedBooking(null);
    setIsModalVisible(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const bookingRes = await bookingServices.getAllBooking();
      const invoiceRes = await invoiceServices.getAll();
      const userRes = await getAllUsers();

      if (!(bookingRes.code === 1000) || !(userRes.code === 1000) || !(invoiceRes.code === 1000)) {
        throw new Error("Lấy dữ liệu thất bại.");
      }

      const bookingsData: BookingResponse[] = Array.isArray(bookingRes.result) ? bookingRes.result : [];
      const invoicesData: InvoiceResponse[] = Array.isArray(invoiceRes.result) ? invoiceRes.result : [];
      const usersData: UserResponse[] = Array.isArray(userRes.result) ? userRes.result : [];

      const combined: BookingWithInvoice[] = await Promise.all(
        bookingsData.map(async (booking) => {
          const matchingInvoice = invoicesData.find(invoice => String(invoice.bookingId) === String(booking.id));
          const matchingUser = usersData.find(user => String(user.id) === String(booking.id));

          // Lấy thông tin tour nếu cần
          let tourInfo = undefined;
          if (booking.tourDepartureId) {
            try {
              const tourRes = await getTourDepartureById(Number(booking.tourDepartureId));
              if (tourRes.code === 1000 && tourRes.result) {
                tourInfo = {
                  name: tourRes.result.tourCode ?? "-",
                  startDate: tourRes.result.departureDate ?? "-",
                };
              }
            } catch (err) {
              console.error("Lỗi lấy tour:", err);
            }
          }

          return {
            ...booking,
            invoiceId: matchingInvoice ? Number(matchingInvoice.id) : null,
            invoiceAmount: matchingInvoice?.totalBookingTourExpense
              ? formatCurrencyVND(Number(matchingInvoice.totalBookingTourExpense))
              : null,
            paymentMethod: matchingInvoice
              ? matchingInvoice.paymentMethodId ? "MOMO" : "Tiền mặt"
              : null,
            invoiceStatus: matchingInvoice?.status ?? null,
            userName: matchingUser?.username ?? null,
            tour: tourInfo
          } satisfies BookingWithInvoice;
        })
      );

      setData(combined);
    } catch (err) {
      console.error("Error loading data:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const columns: ProColumns<BookingWithInvoice>[] = [
    { title: "Mã hóa đơn", dataIndex: "invoiceId", width: 100 },
    { title: "Tên người dùng", dataIndex: "userName" },
    { title: "Mã đặt chỗ", dataIndex: "id", width: 90 },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      render: (val) => val ?? "-",
    },
    {
      title: "Tổng tiền",
      dataIndex: "invoiceAmount",
      render: (val) => val ?? "-",
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "invoiceStatus",
      render: (val) =>
        val === "PAID" ? (
          <Tag color="green">Đã thanh toán</Tag>
        ) : val === "WAITING" ? (
          <Tag color="orange">Chưa thanh toán</Tag>
        ) : (
          "-"
        ),
    },
  ];

  return (
    <>
      <ProTable<BookingWithInvoice>
        headerTitle="Quản lý đặt chỗ & hóa đơn"
        columns={columns}
        loading={loading}
        dataSource={data}
        rowKey="id"
        search={false}
        pagination={{ pageSize: 10 }}
        toolBarRender={false}
        onRow={(record) => ({
          onClick: () => showModal(record),
        })}
      />

      <Modal
        title="Chi tiết hóa đơn"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={700}
      >
        {selectedBooking && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Mã đặt chỗ">{selectedBooking.id}</Descriptions.Item>
            <Descriptions.Item label="Tên người dùng">{selectedBooking.userName ?? "-"}</Descriptions.Item>
            <Descriptions.Item label="Ngày đặt">{selectedBooking.createdAt ?? "-"}</Descriptions.Item>
            <Descriptions.Item label="Ngày thanh toán">{selectedBooking.invoiceStatus === "PAID" ? selectedBooking.createdAt : "-"}</Descriptions.Item>
            <Descriptions.Item label="Mã tour">{selectedBooking.tourDepartureId ?? "-"}</Descriptions.Item>
            <Descriptions.Item label="Tên tour">{selectedBooking.tour?.name ?? "-"}</Descriptions.Item>
            <Descriptions.Item label="Ngày khởi hành">{selectedBooking.tour?.startDate ?? "-"}</Descriptions.Item>
            <Descriptions.Item label="Số lượng khách">{selectedBooking.listOfCustomers?.length ?? 0}</Descriptions.Item>
            <Descriptions.Item label="Danh sách khách hàng">
              {selectedBooking.listOfCustomers?.length
                ? selectedBooking.listOfCustomers.map(c => c.fullName).join(", ")
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng tiền">{selectedBooking.invoiceAmount ?? "-"}</Descriptions.Item>
            <Descriptions.Item label="Phương thức thanh toán">{selectedBooking.paymentMethod ?? "-"}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái thanh toán">{selectedBooking.invoiceStatus ?? "-"}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
};

export default ManagerInvoice;
