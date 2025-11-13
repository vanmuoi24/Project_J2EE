import { Row, Col, Card, Spin, Alert, Modal, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import InvoiceForm from "@/components/Invoice/InvoiceForm";
import bookingServices from "@/services/bookingServices";
import { getTourDepartureById } from "@/services/tourServices";
import { sessionService } from "@/services/sessionServices";

import type { BookingRequest, BookingResponse, CustomerResponse } from "@/types/Booking";
import type { ITourDeparture } from "@/types/Tour";
import type { InvoiceRequest, InvoiceResponse } from "@/types/Invoice";
import type { UserResponse, AxiosResponse } from "@/types/comment";
import invoiceServices from "@/services/invoiceServices";

export default function InvoiceLayout() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserResponse>();
  const [bookingData, setBookingData] = useState<BookingResponse>();
  const [tourDeparture, setTourDeparture] = useState<ITourDeparture>();
  const [customers, setCustomers] = useState<CustomerResponse[]>([]);

  useEffect(() => {
    if (id) loadData(Number(id));
  }, [id]);

  const loadData = async (bookingId: number) => {
    setLoading(true);
    try {
      const user = sessionService.getUser();
      if (!user) throw new Error("Không thể xác định người dùng (session error).");

      const [bookingRes, customerRes] = await Promise.all([
        bookingServices.getBookingById(bookingId),
        bookingServices.getListOfCustomersByBookingId(bookingId),
      ]);

      const booking = bookingRes?.result as BookingResponse;
      const customerList = customerRes?.result as CustomerResponse[];

      setBookingData(booking);
      setCustomers(customerList);
      setCurrentUser(user);

      const tourRes = await getTourDepartureById(Number(booking.tourDepartureId));
      setTourDeparture(tourRes?.result);
    } catch (err: any) {
      setError(err?.message || "Không thể tải dữ liệu hóa đơn.");
      message.error(err?.message);
    } finally {
      setLoading(false);
    }
  };

  /** 🔹 Callback khi nhấn “Thanh toán” */
  const handleCreateInvoice = async (paymentMethod: string) => {
    try {
      if (!bookingData || !tourDeparture) throw new Error("Thiếu dữ liệu để tạo hóa đơn.");

      const invoiceRequest = {
        bookingRequest: {
          bookingId: String(bookingData.id),
          userId: String(sessionService.getUser()?.id),
          tourDepartureId: String(tourDeparture.id),
          listOfCustomers: customers.map((c) => ({
            fullName: c.fullName,
            birthdate: c.birthdate,
            address: c.address,
            gender: c.gender,
            status: c.status,
            bookingType: c.bookingType,
          })),
        },
      };

      const invoiceResult = await invoiceServices.create(invoiceRequest);

      if (invoiceResult.code === 9999) {
        throw new Error("Tạo hóa đơn thất bại.");
      }

      Modal.success({
        title: "Tạo hóa đơn thành công",
        content: "Hóa đơn đã được khởi tạo. Đang chuyển đến trang thanh toán...",
        onOk: () => navigate(invoiceResult.result.paymentUrl || "/"),
      });
    } catch (error: any) {
      console.error(error);
      message.error(error.message || "Lỗi khi tạo hóa đơn.");
    }
  };

  return (
    <div style={{ padding: "24px 10rem", background: "#fff", minHeight: "100vh" }}>
      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} lg={16}>
          <Card bordered={false} style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            {loading && <Spin />}
            {error && <Alert type="error" message={error} showIcon />}
            {!loading && !error && bookingData && (
              <InvoiceForm
                account={{
                  fullName: currentUser?.username || "Khách hàng",
                  email: currentUser?.email || "",
                  phone: currentUser?.phone || "",
                }}
                customers={customers}
                tourDeparture={tourDeparture}
                onCreate={handleCreateInvoice}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
