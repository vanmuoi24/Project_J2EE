import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Input,
  DatePicker,
  Select,
  Table,
  Modal,
  Button,
  Descriptions,
  Tag,
  message,
  Empty,
} from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  FileTextOutlined,
  UserOutlined,
} from "@ant-design/icons";

import bookingServices from "@/services/bookingServices";
import { getAllTourDeparture, getAllTours } from "@/services/tourServices";
import { sessionService } from "@/services/sessionServices";
import { formatDatetime } from "@/utils";
import type { BookingResponse, CustomerResponse } from "@/types/Booking";
import type { ITour, ITourDeparture } from "@/types/Tour";

const { RangePicker } = DatePicker;
const { Option } = Select;

const History: React.FC = () => {
  const navigate = useNavigate();

  // ===== STATE =====
  const [filters, setFilters] = useState({
    searchId: "",
    dateRange: null as [dayjs.Dayjs, dayjs.Dayjs] | null,
    status: "",
  });

  const [data, setData] = useState({
    tours: [] as ITour[],
    tourDepartures: [] as ITourDeparture[],
    bookings: [] as BookingResponse[],
  });

  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingResponse | null>(null);
  const [activeModal, setActiveModal] = useState<"booking" | "invoice" | null>(null);

  // ===== FETCH DATA =====
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const user = sessionService.getUser();
      if (!user) throw new Error("Không tìm thấy người dùng. Vui lòng đăng nhập lại.");

      const [bookingRes, customerRes, depRes, tourRes] = await Promise.all([
        bookingServices.getAllBooking(),
        bookingServices.getAllBookingCustomers(),
        getAllTourDeparture(),
        getAllTours(),
      ]);

      const isSuccess = [bookingRes, customerRes, depRes, tourRes].every(
        (res) => res.code === 1000
      );
      if (!isSuccess) throw new Error("Lỗi khi lấy dữ liệu từ API.");

      const bookings: BookingResponse[] = bookingRes.result.filter(
        (b: BookingResponse) => b.accountId === String(user.id)
      );

      const customers: CustomerResponse = customerRes.result || [];
      const tourDepartures: ITourDeparture[] = depRes.result || [];
      const tours: ITour[] = tourRes.result || [];

      // Gắn khách hàng vào booking
      const bookingsWithCustomers = bookings.map((b) => ({
        ...b,
        listOfCustomers: customers.filter((c) => c.booking?.id === b.id),
      }));

      // Gắn booking vào tourDeparture
      const tourDepWithBookings = tourDepartures.map((t) => ({
        ...t,
        bookings: bookingsWithCustomers.filter(
          (b) => String(b.tourDepartureId) === String(t.id)
        ),
      }));

      setData({
        tours,
        tourDepartures: tourDepWithBookings,
        bookings: bookingsWithCustomers,
      });
    } catch (err) {
      console.error(err);
      message.error("Không thể tải danh sách đặt chỗ. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ===== FILTER =====
  const allUserBookings = useMemo(
    () =>
      data.tourDepartures.flatMap((t) =>
        (t.bookings || []).map((b) => ({
          ...b,
          tourCode: t.tourCode,
          departureDate: t.departureDate,
          returnDate: t.returnDate,
        }))
      ),
    [data.tourDepartures]
  );

  const filteredData = useMemo(() => {
    const { searchId, dateRange, status } = filters;
    return allUserBookings.filter((b) => {
      const byId = b.id.toString().includes(searchId);
      const byStatus = status ? b.status === status : true;
      const byDate = dateRange
        ? dayjs(b.createdAt).isBetween(
          dateRange[0].startOf("day"),
          dateRange[1].endOf("day"),
          null,
          "[]"
        )
        : true;
      return byId && byStatus && byDate;
    });
  }, [allUserBookings, filters]);

  // ===== UI HELPERS =====
  const renderStatusTag = (status: string) => {
    const map: Record<string, string> = {
      CONFIRMED: "green",
      UNCONFIRMED: "orange",
      CANCELLED: "red",
    };
    const text: Record<string, string> = {
      CONFIRMED: "Đã thanh toán",
      UNCONFIRMED: "Chưa thanh toán",
      CANCELLED: "Đã hủy",
    };
    return <Tag color={map[status] || "gray"}>{text[status] || status}</Tag>;
  };

  const columns = [
    { title: "Mã Booking", dataIndex: "id", key: "id", width: "10%" },
    { title: "Mã Tour Code", dataIndex: "tourCode", key: "tourCode", width: "15%" },
    {
      title: "Ngày khởi hành",
      dataIndex: "departureDate",
      key: "departureDate",
      render: (d: string) => formatDatetime(d),
      width: "15%",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: renderStatusTag,
      width: "15%",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: BookingResponse) => (
        <>
          <Button type="link" onClick={() => openModal("booking", record)}>
            Chi tiết
          </Button>
          <Button type="link" onClick={() => openModal("invoice", record)}>
            Hóa đơn
          </Button>
        </>
      ),
    },
  ];

  // ===== MODAL LOGIC =====
  const openModal = (type: "booking" | "invoice", record: BookingResponse) => {
    setSelectedBooking(record);
    setActiveModal(type);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setActiveModal(null);
  };

  const handlePay = () => {
    if (selectedBooking) navigate(`invoice/booking/${selectedBooking.id}`);
  };

  // ===== RENDER =====
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">
        <FileTextOutlined /> Lịch sử đặt chỗ
      </h3>

      {/* Bộ lọc */}
      <div className="flex flex-wrap gap-4 mb-4">
        <Input
          placeholder="Tìm theo mã booking"
          value={filters.searchId}
          onChange={(e) => setFilters({ ...filters, searchId: e.target.value })}
          className="w-1/3"
        />
        <RangePicker
          value={filters.dateRange}
          onChange={(v) => setFilters({ ...filters, dateRange: v as any })}
          className="w-1/3"
        />
        <Select
          placeholder="Chọn trạng thái"
          value={filters.status}
          onChange={(v) => setFilters({ ...filters, status: v })}
          allowClear
          className="w-1/3"
        >
          <Option value="CONFIRMED">Đã thanh toán</Option>
          <Option value="UNCONFIRMED">Chưa thanh toán</Option>
          <Option value="CANCELLED">Đã hủy</Option>
        </Select>
      </div>

      {/* Bảng */}
      <Table
        loading={loading}
        dataSource={filteredData}
        columns={columns}
        rowKey="id"
        locale={{ emptyText: <Empty description="Chưa có đơn đặt chỗ nào." /> }}
        pagination={{ pageSize: 8 }}
        scroll={{ y: 400 }}
      />

      {/* Modal chi tiết booking */}
      <Modal
        title={<span><UserOutlined /> Chi tiết booking</span>}
        open={activeModal === "booking"}
        onCancel={closeModal}
        footer={null}
      >
        {selectedBooking && (
          <>
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Mã booking">{selectedBooking.id}</Descriptions.Item>
              <Descriptions.Item label="Ngày đặt">{formatDatetime(String(selectedBooking.createdAt))}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                {renderStatusTag(selectedBooking.status || "")}
              </Descriptions.Item>
              <Descriptions.Item label="Khách hàng">
                {selectedBooking.listOfCustomers?.length ? (
                  <Table
                    size="small"
                    pagination={false}
                    bordered
                    rowKey={(r) => r.id || r.fullName}
                    dataSource={selectedBooking.listOfCustomers.map((c, i) => ({
                      stt: i + 1,
                      ...c,
                    }))}
                    columns={[
                      { title: "STT", dataIndex: "stt", key: "stt", width: 60 },
                      { title: "Họ tên", dataIndex: "fullName", key: "fullName" },
                      {
                        title: "Ngày sinh / Tuổi",
                        dataIndex: "dateOfBirth",
                        key: "dateOfBirth",
                        render: (dob: string) => {
                          if (!dob) return "-";
                          const birth = dayjs(dob);
                          const age = dayjs().diff(birth, "year");
                          return `${birth.format("DD/MM/YYYY")} (${age} tuổi)`;
                        },
                      },
                      {
                        title: "Giới tính",
                        dataIndex: "gender",
                        key: "gender",
                        render: (g) => (g === "true" ? "Nam" : "Nữ"),
                      },
                      {
                        title: "Trạng thái",
                        dataIndex: "status",
                        key: "status",
                        render: (s) => (s === "BOOKED" ? "Đã đặt" : s),
                      },
                    ]}
                  />
                ) : (
                  "Không có dữ liệu"
                )}
              </Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: 16, textAlign: "right" }}>
              {selectedBooking.status === "UNCONFIRMED" ? (
                <Button type="primary" onClick={handlePay}>
                  Thanh toán ngay
                </Button>
              ) : (
                <Button onClick={closeModal}>Đóng</Button>
              )}
            </div>
          </>
        )}
      </Modal>

      {/* Modal hóa đơn */}
      <Modal
        title={<span><FileTextOutlined /> Chi tiết hóa đơn</span>}
        open={activeModal === "invoice"}
        onCancel={closeModal}
        footer={null}
      >
        {selectedBooking?.status === "UNCONFIRMED" ? (
          <Empty description="Chưa có hóa đơn cho đơn đặt chỗ này." image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="Mã hóa đơn">{selectedBooking?.id}</Descriptions.Item>
            <Descriptions.Item label="Tên tour">{selectedBooking?.tourDepartureId}</Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">{formatDatetime(String(selectedBooking?.createdAt))}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">{renderStatusTag(String(selectedBooking?.status))}</Descriptions.Item>
          </Descriptions>
        )}
        <div style={{ marginTop: 12, textAlign: "right" }}>
          <Button onClick={closeModal}>Đóng</Button>
        </div>
      </Modal>
    </div>
  );
};

export default History;
