import { Table, Button, Drawer, Descriptions, Tag } from "antd";
import { useState } from "react";

type Customer = {
    name: string;
    dob: string;
};

type Booking = {
    id: number;
    tourName: string;
    departureDate: string;
    paymentDate: string;
    paymentMethod: string;
    customers: Customer[];
    status: string;
};

const mockData: Booking[] = [
    {
        id: 1,
        tourName: "Tour Hà Nội - Hạ Long - Sapa",
        departureDate: "2025-11-10",
        paymentDate: "2025-09-15",
        paymentMethod: "Credit Card",
        customers: [
            { name: "Nguyễn Văn A", dob: "1990-01-01" },
            { name: "Trần Thị B", dob: "1995-05-12" },
        ],
        status: "Đã thanh toán",
    },
    {
        id: 2,
        tourName: "Tour Đà Nẵng - Hội An",
        departureDate: "2025-12-05",
        paymentDate: "2025-10-02",
        paymentMethod: "Bank Transfer",
        customers: [
            { name: "Lê Văn C", dob: "1988-03-20" },
        ],
        status: "Đã thanh toán",
    },
];

export default function BookingHistory() {
    const [open, setOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    const handleViewDetail = (record: Booking) => {
        setSelectedBooking(record);
        setOpen(true);
    };

    const columns = [
        {
            title: "Booking ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên tour",
            dataIndex: "tourName",
            key: "tourName",
        },
        {
            title: "Ngày khởi hành",
            dataIndex: "departureDate",
            key: "departureDate",
        },
        {
            title: "Ngày thanh toán",
            dataIndex: "paymentDate",
            key: "paymentDate",
        },
        {
            title: "Phương thức thanh toán",
            dataIndex: "paymentMethod",
            key: "paymentMethod",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: () => <Tag color="green">Đã thanh toán</Tag>,
        },
        {
            title: "Hành động",
            key: "action",
            render: (_: any, record: Booking) => (
                <Button type="link" onClick={() => handleViewDetail(record)}>
                    Xem chi tiết
                </Button>
            ),
        },
    ];

    return (
        <div style={{ padding: "24px 10rem", background: "#fff", minHeight: "100vh" }}>
            <h2>Lịch sử đặt tour</h2>
            <Table
                columns={columns}
                dataSource={mockData}
                rowKey="id"
                pagination={false}
                style={{ marginTop: "16px" }}
            />

            <Drawer
                title={`Chi tiết booking #${selectedBooking?.id}`}
                open={open}
                onClose={() => setOpen(false)}
                width={500}
            >
                {selectedBooking && (
                    <Descriptions column={1} bordered size="small">
                        <Descriptions.Item label="Tên tour">
                            {selectedBooking.tourName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày khởi hành">
                            {selectedBooking.departureDate}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày thanh toán">
                            {selectedBooking.paymentDate}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            <Tag color="green">Đã thanh toán</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Danh sách khách hàng">
                            {selectedBooking.customers.map((c, idx) => (
                                <div key={idx}>
                                    {c.name} ({c.dob})
                                </div>
                            ))}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Drawer>
        </div>
    );
}
