import React, { useCallback, useEffect, useState } from 'react';
import {
    EditOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { Button, Modal, Space, message } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import type { AddTourPriceRequest, ITourPrice } from '@/types/Tour';
import { addPrice, getAllPrice, updateTourPrice, } from '@/services/tourServices';
import AddPrice from './ModelPrice/AddPrice';
import EditPrice from './ModelPrice/EditPrice';

const ManagerPrice: React.FC = () => {
    const [data, setData] = useState<ITourPrice[]>([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedTourPrice, setSelectedTourPrice] = useState<ITourPrice | null>(null);

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
        const newPrice: AddTourPriceRequest = {
            adultPrice: values.adultPrice,
            childPrice: values.childPrice,
            toddlerPrice: values.toddlerPrice,
            infantPrice: values.infantPrice,
            singleSupplementPrice: values.singleSupplementPrice,
        }
        const res = await addPrice(newPrice);
        if (res.code === 1000) {
            setData([res.result, ...data]);
            message.success('Thêm giá thành công');
            setOpenAdd(false);
        } else {
            message.error('Thêm giá thất bại: ');
        }
        setOpenAdd(false);
    };

    const handleEdit = async (values: any) => {
        if (!selectedTourPrice) return;

        const updateData = {
            ...values,
            id: selectedTourPrice.id,
        };

        console.log('Data to update:', updateData);
        const res = await updateTourPrice(updateData);
        console.log('API Response:', res);

        if (res.code === 1000) {
            setData(prev => prev.map(tour =>
                tour.id === selectedTourPrice.id ? { ...tour, ...res.result } : tour
            ));
            message.success("Cập nhật tour thành công");
            setOpenEdit(false);
            setSelectedTourPrice(null);
        } else {
            message.error("Cập nhật tour thất bại");
        }
    };

    const columns: ProColumns<ITourPrice>[] = [
        { title: 'STT', key: 'index', width: 60, align: 'center', render: (_, __, index) => index + 1 },
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
                    <EditOutlined
                        style={{ color: '#1890ff', fontSize: 18 }}
                        onClick={() => {
                            setSelectedTourPrice(record);
                            setOpenEdit(true);
                        }}
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
                headerTitle="Danh sách Combo giá"
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
                <AddPrice onSubmit={handleAdd} />
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
                <EditPrice
                    data={selectedTourPrice}
                    onSubmit={handleEdit}
                />
            </Modal>
        </div>
    );
};

export default ManagerPrice;
