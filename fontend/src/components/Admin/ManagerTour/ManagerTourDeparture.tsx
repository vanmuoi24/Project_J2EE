import React, { useCallback, useEffect, useState } from 'react';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Input, Modal, Form, InputNumber, Select, Space, message } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import type { DepartureDateRequest, IItinerary, ITourDeparture } from '@/types/Tour';
import { addTourDeparture, getAllItineraries, getDepartureByTourId, getItineraryByTourId, getTourDepartureById } from '@/services/tourServices';
import { useLocation } from 'react-router-dom';
import AddTourDeparture from './ModelTourDeparture/AddTourDeparture';
import EditTourDeparture from './ModelTourDeparture/EditTourDeparture';

const ManagerTourDeparture: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tourIdParam = params.get("tourId");
  const tourId = tourIdParam ? Number(tourIdParam) : null;
  const [data, setData] = useState<ITourDeparture[]>([]);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingItinerary, setEditingItinerary] = useState<ITourDeparture | null>(null);

  const fetchDataTourDeparture = useCallback(async () => {
    try {
      if (!tourId) return;

      const res = await getDepartureByTourId(tourId);
      if (res.code === 1000) {
        setData(res.result);
      }
    } catch (error) {
      console.error("Failed to fetch tours:", error);
    }
  }, []);

  useEffect(() => {
    fetchDataTourDeparture();
  }, [fetchDataTourDeparture]);

  const handleAdd = async (values: any) => {
    const newLocation: DepartureDateRequest = {
      departureDate: values.departureDate,
      returnDate: values.returnDate,
      availableSeats: values.availableSeats,
      tourId: tourId!
    };
    const res = await addTourDeparture(newLocation);
    if (res.code === 1000) {
      setData([res.result, ...data]);
      message.success('Thêm ngày khởi hành thành công');
      setOpenAdd(false);
    } else {
      message.error('Thêm ngày khởi hành thất bại: ');
    }
    setOpenAdd(false);
  };

  const handleDelete = (id: number) => {
    setData(data.filter((d) => d.id !== id));
    message.success('Xóa lịch trình thành công');
  };

  const columns: ProColumns<ITourDeparture>[] = [
    { title: 'STT', key: 'index', width: 60, align: 'center', render: (_, __, index) => index + 1 },
    { title: 'Mã tour', dataIndex: 'tourCode' },
    { title: 'Ngày khởi hành', dataIndex: 'departureDate' },
    { title: 'Ngày trở về', dataIndex: 'returnDate' },
    { title: 'Chỗ', dataIndex: 'availableSeats' },
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
      <ProTable<ITourDeparture>
        columns={columns}
        rowKey="id"
        dataSource={data}
        search={false}
        headerTitle="Danh sách ngày khởi hành tour"
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
        <AddTourDeparture onSubmit={handleAdd}/>
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
        <EditTourDeparture />
      </Modal>
    </div>
  );
};

export default ManagerTourDeparture;
