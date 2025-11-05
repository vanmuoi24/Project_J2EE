import React, { useEffect, useState } from "react";
import { ProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";
import type { BookingResponse } from "@/types/Booking";
import type { InvoiceResponse } from "@/types/Invoice";
import bookingServices from "@/services/bookingServices";
import invoiceServices from "@/services/invoiceServices";
import { Tag } from "antd";
import { formatCurrencyVND } from "@/utils";

type BookingWithInvoice = BookingResponse & {
  invoiceId?: number | null;
  invoiceAmount?: string | null;
  paymentMethod?: string | null;
  invoiceStatus?: string | null;
};

const ManagerBooking: React.FC = () => {
  const [data, setData] = useState<BookingWithInvoice[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  /** Load cả 2, sau đó kết hợp hiển thị */
  const loadData = async () => {
    setLoading(true);
    try {
      // Load dữ liệu trực tiếp từ services
      const bookingRes = await bookingServices.getAllBooking();
      const invoiceRes = await invoiceServices.getAllInvoices();

      // Đảm bảo dữ liệu là mảng
      const bookingsData: BookingResponse[] = Array.isArray(bookingRes?.result) ? bookingRes.result : [];
      const invoicesData: InvoiceResponse[] = Array.isArray(invoiceRes?.result) ? invoiceRes.result : [];

      console.log('Raw API Response - Bookings:', bookingRes);
      console.log('Raw API Response - Invoices:', invoiceRes);
      console.log('Processed bookingsData:', bookingsData);
      console.log('Processed invoicesData:', invoicesData);

      // Debug: In ra các ID để kiểm tra matching
      console.log('Booking IDs:', bookingsData.map(b => ({ id: b.id, type: typeof b.id })));
      console.log('Invoice bookingIDs:', invoicesData.map(i => ({
        bookingId: i.bookingId,
        type: typeof i.bookingId,
        invoiceId: i.id
      })));

      // Xử lý từng booking và tìm invoice tương ứng
      const combined: BookingWithInvoice[] = bookingsData.map((booking) => {
        // Debug: In ra giá trị booking.id
        console.log('Processing booking:', {
          bookingId: booking.id,
          bookingIdType: typeof booking.id
        });

        // Tìm invoice cho booking hiện tại
        const matchingInvoice = invoicesData.find(invoice => {
          // Debug: In ra so sánh
          const bookingIdMatch = String(invoice.bookingId) === String(booking.id);
          console.log('Comparing:', {
            bookingId: booking.id,
            invoiceBookingId: invoice.bookingId,
            isMatch: bookingIdMatch
          });
          return bookingIdMatch;
        });

        console.log('Found matching invoice:', matchingInvoice);

        // Tạo đối tượng kết hợp
        return {
          ...booking,
          invoiceId: matchingInvoice?.id ? Number(matchingInvoice.id) : null,
          invoiceAmount: matchingInvoice?.totalBookingTourExpense
            ? formatCurrencyVND(Number(matchingInvoice.totalBookingTourExpense))
            : null,
          paymentMethod: matchingInvoice
            ? matchingInvoice.paymentMethodId ? "MOMO" : "Tiền mặt"
            : null,
          invoiceStatus: matchingInvoice?.status ?? null,
        } satisfies BookingWithInvoice;
      });

      setData(combined);
    } catch (err) {
      console.error('Error loading data:', err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  /** Cột — đầu là booking, sau là invoice */
  const columns: ProColumns<BookingWithInvoice>[] = [
    { title: "Mã đặt chỗ", dataIndex: "id", width: 90 },
    { title: "Tài khoản đặt chỗ", dataIndex: "accountId" },
    { title: "Tour khởi hành", dataIndex: "tourDepartureId" },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      valueType: "dateTime",
    },
    {
      title: "Trạng thái đặt chỗ",
      dataIndex: "status",
      render: (_, record) =>
        record.status === "UNPAID" ? (
          <Tag color="green">Xác nhận đặt tour</Tag>
        ) : (
          <Tag color="red">Đã hủy</Tag>
        ),
    },
    // --- các cột Invoice phía sau ---
    {
      title: "Mã hóa đơn",
      dataIndex: "invoiceId",
      width: 100,
      render: (val) => val ?? "-",
    },
    {
      title: "Tổng tiền",
      dataIndex: "invoiceAmount",
      render: (val) => val ?? "-",
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
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
