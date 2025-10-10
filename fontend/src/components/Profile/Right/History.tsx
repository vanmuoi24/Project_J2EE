import React, { useState } from 'react';
import { Input, DatePicker, Select, Table } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface Booking {
  id: string;
  date: string;
  status: string;
  tourName: string;
}

const mockData: Booking[] = [
  { id: 'BK001', date: '2025-10-01', status: 'Xác nhận', tourName: 'Tour Nhật Bản' },
  { id: 'BK002', date: '2025-10-05', status: 'Chưa xác nhận', tourName: 'Tour Hàn Quốc' },
  { id: 'BK003', date: '2025-10-07', status: 'Đã hủy', tourName: 'Tour Thái Lan' },
];

const History: React.FC = () => {
  const [searchId, setSearchId] = useState('');
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
  const [statusFilter, setStatusFilter] = useState('');

  const filteredData = mockData.filter((item) => {
    const matchesId = item.id.toLowerCase().includes(searchId.toLowerCase());
    const matchesStatus = statusFilter ? item.status === statusFilter : true;
    const matchesDate = dateRange
      ? dayjs(item.date).isAfter(dateRange[0].subtract(1, 'day')) &&
        dayjs(item.date).isBefore(dateRange[1].add(1, 'day'))
      : true;
    return matchesId && matchesStatus && matchesDate;
  });

  const columns = [
    { title: 'Mã đơn', dataIndex: 'id', key: 'id', width: '10%' },
    { title: 'Tên tour', dataIndex: 'tourName', key: 'tourName', width: '50%' },
    { title: 'Ngày đặt', dataIndex: 'date', key: 'date', width: '20%' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '20%',
      render: (status: string) => {
        let color = '';
        if (status === 'Xác nhận') color = 'bg-green-100 text-green-800';
        else if (status === 'Chưa xác nhận') color = 'bg-yellow-100 text-yellow-800';
        else if (status === 'Đã hủy') color = 'bg-red-100 text-red-800';

        return (
          <span className={`!px-2 !py-1 rounded-full text-sm font-semibold ${color}`}>
            {status}
          </span>
        );
      },
    },
  ];

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
        dataSource={filteredData}
        columns={columns}
        rowKey="id"
        locale={{ emptyText: 'Chưa có đơn đặt chỗ nào.' }}
        scroll={{ y: 400 }}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default History;
