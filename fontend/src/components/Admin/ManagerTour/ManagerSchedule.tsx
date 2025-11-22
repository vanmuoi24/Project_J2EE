import React, { useState } from 'react';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Input, Modal, Space, message } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import AddItinerary from './ModelSchedule/AddSchedule';
import EditItinerary from './ModelSchedule/EditSchedule';

interface Itinerary {
  id: number;
  dayNumber: number;
  title: string;
  description: string;
  meal: string;
  tourName: string;
}

// ====== FAKE DATA ======
const FAKE_ITINERARIES: Itinerary[] = [
  {
    id: 1,
    dayNumber: 1,
    title: 'Khởi hành Hà Nội',
    description: 'Khởi hành từ Hà Nội, đi Hạ Long, nhận phòng khách sạn.',
    meal: 'Sáng, Trưa',
    tourName: 'Tour miền Bắc',
  },
  {
    id: 2,
    dayNumber: 2,
    title: 'Tham quan Hạ Long',
    description: 'Du thuyền Hạ Long, khám phá hang động, ăn trưa trên thuyền.',
    meal: 'Sáng, Trưa, Tối',
    tourName: 'Tour miền Bắc',
  },
  {
    id: 3,
    dayNumber: 1,
    title: 'Khởi hành TP.HCM',
    description: 'Bay đến Phú Quốc, nhận phòng resort, nghỉ dưỡng.',
    meal: 'Trưa, Tối',
    tourName: 'Tour Phú Quốc',
  },
];

const ManagerItinerary: React.FC = () => {
  const [data, setData] = useState<Itinerary[]>(FAKE_ITINERARIES);
  const [searchTour, setSearchTour] = useState('');
  const [searchTitle, setSearchTitle] = useState('');

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingItinerary, setEditingItinerary] = useState<Itinerary | null>(null);

  // Lọc dữ liệu theo search
  const filteredData = data.filter(
    (d) =>
      d.tourName.toLowerCase().includes(searchTour.toLowerCase()) &&
      d.title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setData(data.filter((d) => d.id !== id));
    message.success('Xóa lịch trình thành công');
  };

  console.log(editingItinerary);

  const columns: ProColumns<Itinerary>[] = [
    { title: 'STT', key: 'index', width: 60, align: 'center', render: (_, __, index) => index + 1 },
    { title: 'Tour', dataIndex: 'tourName' },
    { title: 'Ngày', dataIndex: 'dayNumber', width: 80 },
    { title: 'Tiêu đề', dataIndex: 'title' },
    { title: 'Mô tả', dataIndex: 'description', ellipsis: true },
    { title: 'Bữa ăn', dataIndex: 'meal' },
    {
      title: 'Hành động',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <EyeOutlined style={{ color: '#faad14', fontSize: 18 }} />
          <EditOutlined
            style={{ color: '#1890ff', fontSize: 18 }}
            onClick={() => {
              setEditingItinerary(record);
              setOpenEdit(true);
            }}
          />
          <DeleteOutlined
            style={{ color: '#ff4d4f', fontSize: 18 }}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Search */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
        <Input
          placeholder="Tìm theo tour"
          value={searchTour}
          onChange={(e) => setSearchTour(e.target.value)}
          style={{ width: 200 }}
        />
        <Input
          placeholder="Tìm theo tiêu đề"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          style={{ width: 200 }}
        />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={() => message.info('Đang lọc dữ liệu...')}
        >
          Tìm kiếm
        </Button>
      </div>

      <ProTable<Itinerary>
        columns={columns}
        rowKey="id"
        dataSource={filteredData}
        search={false}
        headerTitle="Danh sách lịch trình tour"
        toolBarRender={() => [
          <Button
            key="create"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpenAdd(true)}
          >
            Thêm mới
          </Button>,
        ]}
        pagination={{ pageSize: 5 }}
      />

      {/* Modal Add */}
      <Modal
        title="Thêm lịch trình"
        open={openAdd}
        onCancel={() => setOpenAdd(false)}
        footer={null}
        destroyOnClose
        centered
      >
        <AddItinerary />
      </Modal>

      {/* Modal Edit */}
      <Modal
        title="Chỉnh sửa lịch trình"
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        footer={null}
        destroyOnClose
        centered
      >
        <EditItinerary />
      </Modal>
    </div>
  );
};

export default ManagerItinerary;
