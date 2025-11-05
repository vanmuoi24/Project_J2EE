import React, { useEffect, useMemo, useState } from 'react';
import { Input, DatePicker, Select, Table, Modal, Button, Descriptions, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import MOCK_BOOKINGS, { seedBookingCache } from '@/mocks/bookings';
import bookingServices from '@/services/bookingServices';
import { getTourDepartureById } from '@/services/tourServices';
import { sessionService } from '@/services/sessionServices';
const { RangePicker } = DatePicker;
const { Option } = Select;
import type { BookingResponse } from '@/types/Booking';
import { formatDatetime } from '@/utils';

const CACHE_KEY = 'bookingHistoryCache';

const History: React.FC = () => {
  const [searchId, setSearchId] = useState('');
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [data, setData] = useState<BookingResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  /** Load cả 2, sau đó kết hợp hiển thị */
  const loadData = async () => {
    setLoading(true);
    try {
      const { result } = await bookingServices.getAllBooking();
      const currentUser = sessionService.getUser();
      if (!currentUser) return setData([]);

      const accountId = String(currentUser.id);
      const bookings = (Array.isArray(result) ? result : [])
        .filter(b => String(b.accountId ?? '') === accountId);

      const data = await Promise.all(
        bookings.map(async b => ({
          ...b,
          tourDeparture: b.tourDepartureId
            ? (await getTourDepartureById(+b.tourDepartureId)).result
            : undefined,
        }))
      );

      setData(data);
      console.log('Loaded booking history:', data);
    } catch (err) {
      console.error(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };


  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesId = item.id.toLowerCase().includes(searchId.toLowerCase());
      const matchesStatus = statusFilter ? item.status === statusFilter : true;
      const matchesDate = dateRange
        ? dayjs(item.createdAt).isAfter(dateRange[0].subtract(1, 'day')) &&
        dayjs(item.createdAt).isBefore(dateRange[1].add(1, 'day'))
        : true;
      return matchesId && matchesStatus && matchesDate;
    });
  }, [data, searchId, dateRange, statusFilter]);

  const columns = [
    { title: 'Mã Booking', dataIndex: 'id', key: 'id', width: '15%' },
    { title: 'Mã Tour', dataIndex: 'tourDepartureId', key: 'tour-departure-id', width: '15%' },
    { title: 'Tên tour', dataIndex: 'tourName', key: 'tour-name', width: '30%' },
    { title: 'Ngày đặt', dataIndex: 'createdAt', key: 'created-at', width: '20%', render: (createdAt: string) => formatDatetime(String(createdAt)) },
    {
      title: 'Trạng thái', dataIndex: 'status', key: 'status', width: '20%',
      render: (status: string) => {
        let color = '';
        if (status === 'CONFIRMED') {
          color = 'bg-green-100 text-green-800'
          status = 'Đã thanh toán'
        }
        if (status === 'UNPAID') {
          color = 'bg-yellow-100 text-yellow-800'
          status = 'Chưa thanh toán'
        }

        return (
          <span className={`!px-2 !py-1 rounded-full text-sm font-semibold ${color}`}>
            {status}
          </span>
        );
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      width: '15%',
      render: (_: any, record: BookingResponse) => (
        <Button type="link" onClick={() => showDetail(record)}>
          Chi tiết
        </Button>
      ),
    },
  ];

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<BookingResponse | null>(null);
  const navigate = useNavigate();

  const showDetail = (b: BookingResponse) => {
    setSelected(b);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
    setSelected(null);
  };

  const handlePay = () => {
    // navigate to invoice page with booking in state for payment
    navigate('/invoice', { state: { booking: selected } });
  };

  return (
    <div>
      <h3 className="!text-xl !font-semibold !mb-4">Đơn đặt chỗ</h3>

      <div className="!flex !flex-wrap !gap-4 !mb-4">
        <Input
          placeholder="Tìm theo mã đơn"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="!w-1/3"
        />

        <RangePicker
          value={dateRange}
          onChange={(dates) => setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])}
          className="!w-1/3"
        />

        <Select
          placeholder="Chọn trạng thái"
          value={statusFilter}
          onChange={(value) => setStatusFilter(value)}
          allowClear
          className="!w-1/3"
        >
          <Option value="Xác nhận">Xác nhận</Option>
          <Option value="Chưa xác nhận">Chưa xác nhận</Option>
          <Option value="Đã hủy">Đã hủy</Option>
        </Select>
      </div>

      <Table
        loading={loading}
        dataSource={filteredData}
        columns={columns}
        rowKey="id"
        locale={{ emptyText: 'Chưa có đơn đặt chỗ nào.' }}
        scroll={{ y: 400 }}
        pagination={{ pageSize: 10 }}
      />

      {/* --- Modal for booking details --- */}
      <Modal
        title="Chi tiết booking"
        open={visible}
        onCancel={handleClose}
        footer={null}
      >
        {selected && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Mã đơn">{selected.id}</Descriptions.Item>
            <Descriptions.Item label="Tên tour">{selected.tourDepartureId}</Descriptions.Item>
            <Descriptions.Item label="Ngày đặt">{formatDatetime(String(selected.createdAt))}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">{selected.status === 'CONFIRMED' ? 'Đã thanh toán' : 'Chưa thanh toán'}</Descriptions.Item>
            {/* {selected. !== undefined && (
              <Descriptions.Item label="Số tiền">
                {selected.amount.toLocaleString('vi-VN')} VND
              </Descriptions.Item>
            )} */}
          </Descriptions>
        )}

        <div style={{ marginTop: 12, textAlign: 'right' }}>
          {selected?.status === 'UNPAID' ? (
            <Button type="primary" onClick={handlePay}>
              Thanh toán
            </Button>
          ) : (
            <Button onClick={handleClose}>Đóng</Button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default History;
