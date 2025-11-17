import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input, Space, Popconfirm, message, Modal } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import EditDestination from './ModelDestinaton/EditDestination';
import AddDestination from './ModelDestinaton/AddDestination';
import type { ILocation, LocationRequest } from '@/types/Tour';
import { addLocation, deleteLocation, getAllLocation } from '@/services/tourServices';

const ManagerDestination: React.FC = () => {
  const [data, setData] = useState<ILocation[]>([]);
  const [searchCity, setSearchCity] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingDest, setEditingDest] = useState<ILocation | null>(null);

  const fetchDataLocation = useCallback(async () => {
      try {
        const res = await getAllLocation();
        if (res.code === 1000) {
          setData(res.result);
        }
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      }
    }, []);
  
    useEffect(() => {
      fetchDataLocation();
    }, [fetchDataLocation]);

  // Filter dữ liệu
  const filteredData = data.filter(
    (d) =>
      d.city.toLowerCase().includes(searchCity.toLowerCase()) 
  );

  const handleDelete = async (id: number) => {
    const res = await deleteLocation(id);
    if (res.code === 1000) {
      setData((prevData) => prevData.filter((d) => d.id !== id));
      message.success('Xóa điểm đến thành công');
    } else {
      message.error('Xóa thất bại: ');
    }
  };

  const handleAdd = async (values: any) => {
    const newLocation: LocationRequest = {
      city: values.name,
      type: values.type,
    };
    const res = await addLocation(newLocation);
    if (res.code === 1000) {
      setData([res.result, ...data]);
      message.success('Thêm điểm đến thành công');
      setOpenAdd(false);
    } else {
      message.error('Thêm điểm đến thất bại: ');
    }
    setOpenAdd(false);
  };

  const handleEdit = (values: any) => {
    if (!editingDest) return;
    const updatedData = data.map((d) => (d.id === editingDest.id ? { ...d, ...values } : d));
    setData(updatedData);
    message.success('Cập nhật điểm đến thành công');
    setOpenEdit(false);
  };

  const columns: ProColumns<ILocation>[] = [
    { title: 'Tên thành phố', dataIndex: 'city' },
    { title: 'Loại', dataIndex: 'type' },
    {
      title: 'Hành động',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <EditOutlined
            style={{ color: '#1890ff', fontSize: 18 }}
            onClick={() => {
              setEditingDest(record);
              setOpenEdit(true);
            }}
          />
          <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => handleDelete(record.id)}>
            <DeleteOutlined style={{ color: '#ff4d4f', fontSize: 18 }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Search */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
        <Input
          placeholder="Tìm theo thành phố"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          style={{ width: 200 }}
        />
        <Button icon={<SearchOutlined />} type="primary">
          Tìm kiếm
        </Button>
      </div>

      {/* Table */}
      <ProTable<ILocation>
        columns={columns}
        rowKey="id"
        dataSource={filteredData}
        search={false}
        headerTitle="Danh sách điểm đến"
        toolBarRender={() => [
          <Button key="add" type="primary" icon={<PlusOutlined />} onClick={() => setOpenAdd(true)}>
            Thêm mới
          </Button>,
        ]}
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `Hiển thị ${range[0]}-${range[1]} trong tổng số ${total} mục`,
        }}
      />

      {/* Modal Add */}
      <Modal
        title="Thêm điểm đến"
        open={openAdd}
        onCancel={() => setOpenAdd(false)}
        footer={null}
        destroyOnClose
        centered
      >
        <AddDestination onSubmit={handleAdd} />
      </Modal>

      {/* Modal Edit */}
      <Modal
        title="Chỉnh sửa điểm đến"
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        footer={null}
        destroyOnClose
        centered
      >
        <EditDestination data={editingDest || {}} onSubmit={handleEdit} />
      </Modal>
    </div>
  );
};

export default ManagerDestination;
