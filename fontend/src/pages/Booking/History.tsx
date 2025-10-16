import { useEffect, useState } from 'react';
import { Table, Card, Typography, message } from 'antd';
import { getBookingHistory } from '@/services/bookingServices';

const { Title } = Typography;

export default function BookingHistoryPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await getBookingHistory();
        const list = (res as any).result || (res as any).data?.result || (res as any).data || [];
        setData(Array.isArray(list) ? list : []);
      } catch (err: any) {
        message.error(err?.message || 'Không thể load lịch sử');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const columns = [
    { title: 'Booking ID', dataIndex: 'id', key: 'id' },
    { title: 'Ngày tạo', dataIndex: 'createAt', key: 'createAt' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
  ];

  return (
    <div style={{ padding: '24px 10rem' }}>
      <Card>
        <Title level={4}>Lịch sử đặt tour</Title>
        <Table columns={columns} dataSource={data} rowKey={(r) => r.id || r.bookingId} loading={loading} />
      </Card>
    </div>
  );
}
