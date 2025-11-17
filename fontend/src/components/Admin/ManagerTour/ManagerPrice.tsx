import React, { useCallback, useEffect, useState } from 'react';
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { Button, Modal, Space, message } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import type { ITourPrice, TourPriceRequest } from '@/types/Tour';
import { addPrice, getAllPrice, } from '@/services/tourServices';
import AddPrice from './ModelPrice/AddPrice';
import EditPrice from './ModelPrice/EditPrice';

const ManagerPrice: React.FC = () => {
    const [data, setData] = useState<ITourPrice[]>([]);

    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editingItinerary, setEditingItinerary] = useState<ITourPrice | null>(null);

    const fetchDataPrice = useCallback(async () => {
        try {
            const res = await getAllPrice();
            if (res.code === 1000) {
                setData(res.result);
            }
        } catch (error) {
            console.error("Failed to fetch prices:", error);
        }
    }, []);

    useEffect(() => {
        fetchDataPrice();
    }, [fetchDataPrice]);

    const handleAdd = async (values: any) => {
        const newLocation: TourPriceRequest = {
            adultPrice: values.adultPrice,
            childPrice: values.childPrice,
            toddlerPrice: values.toddlerPrice,
            infantPrice: values.infantPrice,
            singleSupplementPrice: values.singleSupplementPrice,
        }
        const res = await addPrice(newLocation);
        if (res.code === 1000) {
            setData([res.result, ...data]);
            message.success('Thêm giá thành công');
            setOpenAdd(false);
        } else {
            message.error('Thêm giá thất bại: ');
        }
        setOpenAdd(false);
    };

    const handleDelete = (id: number) => {
        setData(data.filter((d) => d.id !== id));
        message.success('Xóa lịch trình thành công');
    };

    const columns: ProColumns<ITourPrice>[] = [
        
        { title: 'Người lớn', dataIndex: 'adultPrice' },
        { title: 'Trẻ em', dataIndex: 'childPrice' },
        { title: 'Trẻ nhỏ', dataIndex: 'toddlerPrice' },
        { title: 'Em bé', dataIndex: 'infantPrice' },
        { title: 'Phụ thu phòng đơn', dataIndex: 'singleSupplementPrice' },
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
            <ProTable<ITourPrice>
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
                <AddPrice onSubmit={handleAdd}/>
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
                <EditPrice />
            </Modal>
        </div>
    );
};

export default ManagerPrice;
