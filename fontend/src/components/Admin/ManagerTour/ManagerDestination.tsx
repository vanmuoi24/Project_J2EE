import React, { useState } from 'react';
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

interface Destination {
  id: number;
  name: string;
  country: string;
  city: string;
  description: string;
}

const ManagerDestination: React.FC = () => {
  const [data, setData] = useState<Destination[]>([
    {
      id: 1,
      name: 'Vịnh Hạ Long',
      country: 'Việt Nam',
      city: 'Quảng Ninh',
      description: 'Di sản thiên nhiên thế giới',
    },
    {
      id: 2,
      name: 'Kyoto',
      country: 'Nhật Bản',
      city: 'Kyoto',
      description: 'Thành phố cổ với nhiều đền chùa',
    },
  ]);

  const [searchName, setSearchName] = useState('');
  const [searchCountry, setSearchCountry] = useState('');
  const [searchCity, setSearchCity] = useState('');

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingDest, setEditingDest] = useState<Destination | null>(null);

  // Filter dữ liệu
  const filteredData = data.filter(
    (d) =>
      d.name.toLowerCase().includes(searchName.toLowerCase()) &&
      d.country.toLowerCase().includes(searchCountry.toLowerCase()) &&
      d.city.toLowerCase().includes(searchCity.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setData(data.filter((d) => d.id !== id));
    message.success('Xóa điểm đến thành công');
  };

  const handleAdd = (values: any) => {
    const newDest: Destination = { id: Date.now(), ...values };
    setData([newDest, ...data]);
    message.success('Thêm điểm đến thành công');
    setOpenAdd(false);
  };

  const handleEdit = (values: any) => {
    if (!editingDest) return;
    const updatedData = data.map((d) => (d.id === editingDest.id ? { ...d, ...values } : d));
    setData(updatedData);
    message.success('Cập nhật điểm đến thành công');
    setOpenEdit(false);
  };

  const columns: ProColumns<Destination>[] = [
    { title: 'STT', key: 'index', width: 60, align: 'center', render: (_, __, index) => index + 1 },
    { title: 'Tên điểm đến', dataIndex: 'name' },
    { title: 'Quốc gia', dataIndex: 'country' },
    { title: 'Thành phố', dataIndex: 'city' },
    { title: 'Mô tả', dataIndex: 'description' },
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
          placeholder="Tìm theo tên"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ width: 200 }}
        />
        <Input
          placeholder="Tìm theo quốc gia"
          value={searchCountry}
          onChange={(e) => setSearchCountry(e.target.value)}
          style={{ width: 200 }}
        />
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
      <ProTable<Destination>
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
