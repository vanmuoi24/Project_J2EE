import { Row, Col, Card } from 'antd';
import InvoiceForm from '@/components/Invoice/InvoiceForm';
import InvoiceHistory from '@/components/Invoice/InvoiceHistory';

export default function InvoiceLayout() {
  return (
    <div style={{ padding: '24px 10rem', background: '#fff', minHeight: '100vh' }}>
      <Row gutter={[24, 24]} justify="center" align="top">
        <Col xs={24} lg={16}>
          <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', marginBottom: 16 }}>
            {/* InvoiceForm expects account & customers props in real usage; here we pass mock data */}
            <InvoiceForm
              account={{ fullName: 'Khách hàng', email: 'guest@example.com', phone: '0123456789' }}
              customers={[{ name: 'Nguyễn Văn A', dob: '1990-01-01', price: 1000000 }]}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            <InvoiceHistory />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
