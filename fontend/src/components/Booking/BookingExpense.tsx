import { Card, Typography, Row, Col, Button, Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import { getTourDepartureById } from '@/services/tourServices';
import { formatCurrencyVND } from '@/utils/index';

const { Title, Text } = Typography;

type ExpenseItem = {
  label: string;
  quantity: number;
  price: number;
};

type BookingExpenseProps = {
  total: number;
  items: ExpenseItem[];
  singleRoomSurcharge?: number;
  onConfirm?: () => void | Promise<void>;
  tourDepartureId?: number | string;
};

export default function BookingExpense({
  total,
  singleRoomSurcharge = 0,
  items,
  onConfirm,
  tourDepartureId,
}: BookingExpenseProps) {
  const [tourPrice, setTourPrice] = useState<any | null>(null);
  const [calculatedTotal, setCalculatedTotal] = useState<number>(total || 0);

  useEffect(() => {
    const load = async () => {
      if (!tourDepartureId) return;
      try {
        const id = typeof tourDepartureId === 'string' ? Number(tourDepartureId) : tourDepartureId;
        const resp = await getTourDepartureById(Number(id));
        setTourPrice(resp.result?.tourPrice || null);
      } catch (err) {
        console.error('Failed to load tour departure', err);
      }
    };
    load();
  }, [tourDepartureId]);

  useEffect(() => {
    const priceFromLabel = (label: string, defaultPrice: number) => {
      if (!tourPrice) return defaultPrice;
      const l = label.toLowerCase();
      if (l.includes('người lớn') || l.includes('nguoi lon') || l.includes('adult'))
        return tourPrice.adultPrice;
      if (l.includes('trẻ em') || l.includes('tre em') || l.includes('child'))
        return tourPrice.childPrice;
      if (l.includes('em bé') || l.includes('em be') || l.includes('infant') || l.includes('baby'))
        return tourPrice.infantPrice ?? defaultPrice;
      return defaultPrice;
    };

    const itemsTotal = items.reduce((sum, it) => {
      const unit = priceFromLabel(it.label, it.price);
      return sum + unit * it.quantity;
    }, 0);

    setCalculatedTotal(itemsTotal + (singleRoomSurcharge || 0));
  }, [tourPrice, items, singleRoomSurcharge]);

  const handleConfirm = () => {
    Modal.confirm({
      title: 'Xác nhận đặt tour',
      content: 'Bạn có chắc chắn muốn đặt tour này?',
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await Promise.resolve(onConfirm?.());
        } catch (err: any) {
          message.error(err?.message || 'Đặt tour thất bại');
          throw err;
        }
      },
    });
  };

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={5}>KHÁCH HÀNG + PHỤ THU</Title>
        </Col>
        <Col>
          <Title level={4} style={{ color: 'red', margin: 0 }}>
            {formatCurrencyVND(calculatedTotal)}
          </Title>
        </Col>
      </Row>

      <div style={{ marginTop: '12px' }}>
        {items.map((item, index) => {
          const unitPrice = ((): number => {
            if (!tourPrice) return item.price;
            const l = item.label.toLowerCase();
            if (l.includes('người lớn') || l.includes('nguoi lon') || l.includes('adult'))
              return tourPrice.adultPrice;
            if (l.includes('trẻ em') || l.includes('tre em') || l.includes('child'))
              return tourPrice.childPrice;
            if (
              l.includes('em bé') ||
              l.includes('em be') ||
              l.includes('infant') ||
              l.includes('baby')
            )
              return tourPrice.infantPrice ?? item.price;
            return item.price;
          })();
          return (
            <Row key={index} justify="space-between" style={{ marginBottom: '6px' }}>
              <Col>
                <Text>{item.label}</Text>
              </Col>
              <Col>
                <Text>
                  {item.quantity} x {formatCurrencyVND(unitPrice)}
                </Text>
              </Col>
            </Row>
          );
        })}

        <Row justify="space-between">
          <Col>
            <Text>Phụ thu phòng đơn</Text>
          </Col>
          <Col>
            <Text>{formatCurrencyVND(singleRoomSurcharge)}</Text>
          </Col>
        </Row>
      </div>
      <div style={{ marginTop: 16 }}>
        <Button type="primary" block size="large" onClick={handleConfirm}>
          Xác nhận đặt tour
        </Button>
      </div>
    </>
  );
}
