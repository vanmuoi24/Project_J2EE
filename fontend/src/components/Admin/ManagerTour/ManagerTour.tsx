import React, { useState } from 'react';
import { ProTable, type ProColumns } from '@ant-design/pro-components';
import { Button, Space, Image, message, Modal } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import AddNewTour from './ModelTour/AddNewTour';
import EditTour from './ModelTour/EditTour';

// ==== FAKE DỮ LIỆU ====
const FAKE_TOURS = [
  {
    id: 1,
    tourTitle: 'Khám phá miền Bắc',
    tourProgram: 'Hà Nội - Hạ Long - Sapa',
    description: 'Trải nghiệm phong cảnh hùng vĩ và văn hóa miền Bắc Việt Nam.',
    duration: 5,
    basePrice: 4500000,
    departureName: 'Hà Nội',
    destinationName: 'Sapa',
    vehicleName: 'Xe giường nằm',
    imageUrls: [
      'https://picsum.photos/seed/1/300/200',
      'https://picsum.photos/seed/2/300/200',
      'https://picsum.photos/seed/3/300/200',
    ],
  },
  {
    id: 2,
    tourTitle: 'Thiên đường đảo ngọc',
    tourProgram: 'TP.HCM - Phú Quốc',
    description: 'Tour nghỉ dưỡng cao cấp trên đảo Phú Quốc.',
    duration: 4,
    basePrice: 6900000,
    departureName: 'TP.HCM',
    destinationName: 'Phú Quốc',
    vehicleName: 'Máy bay',
    imageUrls: [
      'https://picsum.photos/seed/4/300/200',
      'https://picsum.photos/seed/5/300/200',
      'https://picsum.photos/seed/6/300/200',
    ],
  },
  {
    id: 3,
    tourTitle: 'Di sản miền Trung',
    tourProgram: 'Đà Nẵng - Hội An - Huế',
    description: 'Hành trình di sản văn hóa và ẩm thực miền Trung.',
    duration: 3,
    basePrice: 3500000,
    departureName: 'Đà Nẵng',
    destinationName: 'Huế',
    vehicleName: 'Xe du lịch',
    imageUrls: ['https://picsum.photos/seed/8/300/200', 'https://picsum.photos/seed/9/300/200'],
  },
];

// ==== Cấu hình bảng ====

const ManagerTourList: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const columns: ProColumns<any>[] = [
    {
      title: 'Tên tour',
      dataIndex: 'tourTitle',
      key: 'tourTitle',
      width: 190,
      copyable: true,
      ellipsis: true,
    },
    {
      title: 'Chương trình',
      dataIndex: 'tourProgram',
      key: 'tourProgram',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Điểm đi → đến',
      key: 'route',
      width: 220,
      renderText: (_, r) => `${r.departureName} → ${r.destinationName}`,
    },
    {
      title: 'Phương tiện',
      dataIndex: 'vehicleName',
      key: 'vehicleName',
      width: 140,
    },
    {
      title: 'Thời lượng (ngày)',
      dataIndex: 'duration',
      key: 'duration',
      width: 140,
      sorter: (a, b) => a.duration - b.duration,
    },
    {
      title: 'Giá cơ bản (VNĐ)',
      dataIndex: 'basePrice',
      key: 'basePrice',
      width: 160,
      sorter: (a, b) => a.basePrice - b.basePrice,
      renderText: (v) => Number(v).toLocaleString('vi-VN'),
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'imageUrls',
      key: 'imageUrls',
      width: 180,
      render: (_, r) =>
        r.imageUrls?.length ? (
          <Image.PreviewGroup>
            <Space wrap>
              {r.imageUrls.slice(0, 3).map((url: any, i: any) => (
                <Image
                  key={i}
                  src={url}
                  width={48}
                  height={48}
                  style={{ objectFit: 'cover', borderRadius: 8 }}
                />
              ))}
              {r.imageUrls.length > 3 ? <span>+{r.imageUrls.length - 3}</span> : null}
            </Space>
          </Image.PreviewGroup>
        ) : (
          <span>—</span>
        ),
    },
    {
      title: 'Hành động',
      key: 'action',
      valueType: 'option',
      width: 150,
      render: (_, r) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => message.info(`Xem: ${r.tourTitle}`)}
          />
          <Button type="link" icon={<EditOutlined />} onClick={() => setOpenEdit(true)} />
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => message.success(`(Demo) Đã yêu cầu xóa tour #${r.id}`)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable
        headerTitle="Danh sách Tour"
        rowKey="id"
        columns={columns}
        dataSource={FAKE_TOURS}
        search={{ labelWidth: 'auto' }}
        pagination={{ pageSize: 10, showSizeChanger: true }}
        toolBarRender={() => [
          <Button key="add" type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
            Thêm tour
          </Button>,
        ]}
      />

      <Modal
        title="Thêm tour mới"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose
        style={{ top: 40 }}
        width={900}
      >
        <AddNewTour />
      </Modal>

      <Modal
        title={'Chỉnh sửa tour:'}
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        footer={null}
        destroyOnClose
        centered={false}
        style={{ top: 40 }}
        width={900}
      >
        <EditTour />
      </Modal>
    </>
  );
};

export default ManagerTourList;
