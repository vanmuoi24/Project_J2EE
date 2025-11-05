import { Row, Col, Card, Spin, Alert, Modal } from 'antd';
import InvoiceForm from '@/components/Invoice/InvoiceForm';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createInvoice, getInvoiceById } from '@/services/invoiceServices';
import MoMoQR from '@/components/Payment/MoMoQR';

export default function InvoiceLayout() {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invoiceData, setInvoiceData] = useState<any | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const res = await getInvoiceById(id as string);
        setInvoiceData(res || null);
      } catch (err: any) {
        setError(err?.message || 'Failed to load invoice');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // CREATE INVOICE handler called from InvoiceForm
  const handleCreateInvoice = async (values: { paymentMethod: string; items: any[] }) => {
    setLoading(true);
    setError(null);
    try {
      const invoice = JSON.parse(sessionStorage.getItem("invoice") || "{}");
      console.log(invoice)

      const bookingId = invoice?.bookingId || id || '';
      const payload = {
        bookingId: bookingId as string,
        paymentMethod: values.paymentMethod,
        items: values.items,
      };


      const res = await createInvoice(payload as any);

      // Show success modal and, if payment info returned, show MoMo QR modal
      Modal.success({ title: 'Tạo hóa đơn thành công', content: 'Invoice created' });

      const paymentInfo = ((res as any).result || {}) as any;
      const paymentQrBase64 = paymentInfo?.paymentQrBase64 as string | undefined;
      const paymentUrl = paymentInfo?.paymentUrl as string | undefined;

      if (paymentQrBase64 || paymentUrl) {
        Modal.info({
          title: 'Hoàn tất thanh toán',
          content: <MoMoQR paymentQrBase64={paymentQrBase64} paymentUrl={paymentUrl} onClose={() => Modal.destroyAll()} />,
          width: 420,
          okText: 'Đóng',
          onOk: () => Modal.destroyAll(),
        });
      }

      // const newInvoiceId = (res as any)?.result?.id || undefined;
      // console.log(res)

      // if (newInvoiceId) {
      //   navigate(`/invoice/${newInvoiceId}`);
      // } else {
      //   // reload current invoice if exists
      //   if (id) {
      //     const getRes = await getInvoiceById(id as string);
      //     setInvoiceData(getRes.result || null);
      //   }
      // }
    } catch (err: any) {
      setError(err?.message || 'Tạo hóa đơn thất bại');
      Modal.error({ title: 'Lỗi', content: err?.message || 'Tạo hóa đơn thất bại' });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px 10rem', background: '#fff', minHeight: '100vh' }}>
      <Row gutter={[24, 24]} justify="center" align="top">
        <Col xs={24} lg={16}>
          <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', marginBottom: 16 }}>
            {loading && <Spin />}
            {error && <Alert type="error" message={error} />}
            {!id && (
              <InvoiceForm
                account={{ fullName: 'Khách hàng', email: 'guest@example.com', phone: '0123456789' }}
                customers={[{ name: 'Nguyễn Văn A', dob: '1990-01-01', price: 1000000 }]}
                onCreate={handleCreateInvoice}
              />
            )}
            {id && invoiceData && (
              // Map invoiceData to InvoiceForm props
              <InvoiceForm
                account={{
                  fullName: invoiceData.userId || 'Khách hàng',
                  email: '',
                  phone: '',
                }}
                customers={
                  (invoiceData.customerResponseList || []).map((c: any) => ({
                    name: c.fullName,
                    dob: c.birthdate,
                    price: Number(c.bookingType) || 0,
                  }))
                }
                onCreate={handleCreateInvoice}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
