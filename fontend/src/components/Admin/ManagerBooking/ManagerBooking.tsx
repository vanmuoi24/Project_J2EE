import React, { useEffect, useState } from "react";
import { ProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";
import type { BookingResponse } from "@/types/Booking";
import type { InvoiceResponse } from "@/types/Invoice";
import type { UserResponse } from "@/types/comment";
import bookingServices from "@/services/bookingServices";
import invoiceServices from "@/services/invoiceServices";
import { getAllUsers } from "@/services/userServices";
import { Tag } from "antd";
import { formatCurrencyVND } from "@/utils";

type BookingWithInvoice = BookingResponse & {
  invoiceId?: number | null;
  invoiceAmount?: string | null;
  paymentMethod?: string | null;
  invoiceStatus?: string | null;
  userName?: string | null;
};

const ManagerBooking: React.FC = () => {
  const [data, setData] = useState<BookingWithInvoice[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  /**
   * Load dữ liệu Booking và Invoice, sau đó kết hợp chúng lại với nhau
   */
  const loadData = async () => {
    setLoading(true);
    try {
      /**
       * Gọi song song 2 API (Booking và Invoice)
       */
      const bookingRes = await bookingServices.getAllBooking();
      const invoiceRes = await invoiceServices.getAll();
      const userRes = await getAllUsers();
      
      if (!(bookingRes.code === 1000) || !(userRes.code === 1000) || !(invoiceRes.code === 1000)) {
        console.log(bookingRes)
        console.log(userRes)
        console.log(invoiceRes)
        throw new Error("Lấy dữ liệu thất bại."); 
      }

      /**
       *  Debug: In ra dữ liệu thô từ API
       */
      const bookingsData: BookingResponse[] = Array.isArray(bookingRes?.result) ? bookingRes.result : [];
      const invoicesData: InvoiceResponse[] = Array.isArray(invoiceRes?.result) ? invoiceRes.result : [];
      const usersData: UserResponse[] = Array.isArray(userRes.result) ? userRes.result : [];

      /*
      * Xử lý từng booking và tìm invoice tương ứng
      */
      const combined: BookingWithInvoice[] = bookingsData.map((booking) => {
        /*
        * Tìm invoice khớp với booking hiện tại
        * So sánh kỹ càng kiểu dữ liệu để tránh lỗi không khớp
        */
        const matchingInvoice = invoicesData.find(invoice => {
          const bookingIdMatch = String(invoice.bookingId) === String(booking.id);
          return bookingIdMatch;
        });

        // 🔹 Tìm user tương ứng với booking
        const matchingUser = usersData.find(user => {
          const userResult = String(user.id) === String(booking.id);
          return userResult;
        });

        return {
          ...booking,
          invoiceId: Number(matchingInvoice?.id) ?? null,
          invoiceAmount: matchingInvoice?.totalBookingTourExpense
            ? formatCurrencyVND(Number(matchingInvoice.totalBookingTourExpense))
            : null,
          paymentMethod: matchingInvoice
            ? matchingInvoice.paymentMethodId ? "MOMO" : "Tiền mặt"
            : null,
          invoiceStatus: matchingInvoice?.status ?? null,
          userName: matchingUser?.username
        } satisfies BookingWithInvoice;
      });

      console.log(combined)
      setData(combined);
    } catch (err) {
      console.error('Error loading data:', err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cột — đầu là booking, sau là invoice
   */
  const columns: ProColumns<BookingWithInvoice>[] = [
    { title: "Mã đặt chỗ", dataIndex: "id", width: 90 },
    { title: "Tên người dùng", dataIndex: "userName" },
    { title: "Tour khởi hành", dataIndex: "tourDepartureId" },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      valueType: "dateTime",
    },
    {
      title: "Ngày khởi hành", dataIndex: "createdAt",
      valueType: "dateTime",
    },

    {
      title: "Trạng thái đặt chỗ",
      dataIndex: "status",
      render: (_, record) =>
        record.status === "UNPAID" ? (
          <Tag color="red">Đã hủy</Tag>
        ) : (
          <Tag color="green">Xác nhận đặt tour</Tag>
        ),
    },
  ];

  return (
    <ProTable<BookingWithInvoice>
      headerTitle="Quản lý đặt chỗ & hóa đơn"
      columns={columns}
      loading={loading}
      dataSource={data}
      rowKey="id"
      search={false}
      pagination={{ pageSize: 10 }}
      toolBarRender={false}
    />
  );
};

export default ManagerBooking;
