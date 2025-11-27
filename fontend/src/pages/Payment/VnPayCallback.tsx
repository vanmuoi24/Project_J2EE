import { useEffect, useState, useRef } from 'react';
import { Spin, Card, Result, Button, Descriptions } from 'antd';
import paymentServices from '@/services/paymentServices';
import invoiceServices from '@/services/invoiceServices';
import { formatCurrencyVND, formatDatetime } from "@/utils/index"
import { useAppSelector } from '@/store/hooks';
import type { RootState } from '@/store';

export default function VnPayCallback() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [invoice, setInvoice] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState('');
  const calledRef = useRef(false);

   const { user } = useAppSelector((state: RootState) => state.auth);
 console.log(user)

 console.log(invoice)
  /**
   * Xử lý tạo invoice sau khi thanh toán thành công
   */
  const createInvoiceAfterPayment = async () => {
    const temp = sessionStorage.getItem('invoice_temp');
    const data = temp ? JSON.parse(temp) : null;

    if (!data?.invoiceRequest) {
      throw new Error('Không tìm thấy dữ liệu invoice để lưu.');
    }

    const res = await invoiceServices.create(data.invoiceRequest);

    if (res.code === 1000) {
      sessionStorage.removeItem('invoice_temp');
      return true;
    }

    return false;
  };

  const formatPayDate = (raw: string) => {
  if (!raw) return "";
  const year = raw.substring(0, 4);
  const month = raw.substring(4, 6);
  const day = raw.substring(6, 8);
  const hour = raw.substring(8, 10);
  const minute = raw.substring(10, 12);
  const second = raw.substring(12, 14);

  return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
};

  /**
   * Gọi API kiểm tra callback thanh toán
   */
  const fetchPaymentStatus = async () => {
  try {
    const queryString = window.location.search;
    const callbackPaymentUrl = `http://localhost:8888/api/v1/payment/vnpay/return${queryString}`;

    const paymentCallbackRes = await paymentServices.get(callbackPaymentUrl);

    if (paymentCallbackRes.code === 1000) {

      setStatus("success");
      setInvoice(paymentCallbackRes.result);

      // TẠO INVOICE
      const ok = await createInvoiceAfterPayment();
      if (!ok) {
        setError("Thanh toán thành công nhưng tạo hóa đơn thất bại.");
      }

      // GỬI EMAIL XÁC NHẬN
      await sendEmail(paymentCallbackRes.result);

    } else {
      setStatus("fail");
      setError(paymentCallbackRes.result || "Thanh toán thất bại!");
    }

  } catch (err: any) {
    setStatus("fail");
    setError(err?.message || "Lỗi không xác định");
  } finally {
    setLoading(false);
  }
};


const sendEmail = async (invoice: any) => {
  try {
    await fetch("http://localhost:5678/webhook/send-confirm-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: user?.email || "user@example.com",
        subject: "Xác nhận thanh toán thành công",
        body: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #4CAF50;">Thanh toán thành công!</h2>

            <p>Xin chào <strong>${user?.username}</strong>,</p>
            <p>Cảm ơn bạn đã thực hiện giao dịch. Dưới đây là thông tin chi tiết:</p>

            <table style="border-collapse: collapse; margin-top: 16px;">
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;">Mã giao dịch</td>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>${invoice?.orderId}</strong></td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;">Số tiền</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${formatCurrencyVND(invoice?.amount)}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;">Ngày thanh toán</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${formatPayDate(invoice?.payDate)}</td>
              </tr>
            </table>

            <p style="margin-top: 24px;">Nếu bạn có bất kỳ thắc mắc nào, xin vui lòng liên hệ hỗ trợ.</p>

            <p>Trân trọng,<br/>Hệ thống thanh toán</p>
          </div>
        `
      }),
    });
  } catch (err) {
    console.error("Gửi email thất bại:", err);
  }
};


  /**
   * Hook chạy 1 lần (kể cả StrictMode)
   */
  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    fetchPaymentStatus();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '5rem', textAlign: 'center' }}>
        <Spin size="large" />
        <p>Đang xác thực giao dịch...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px 10rem' }}>
      {status === 'success' ? (
        <>
          <Result
            status="success"
            title="Thanh toán thành công!"
            subTitle={`Mã giao dịch: ${invoice?.orderId}`}
          />

          {/* FORM THÔNG TIN GIAO DỊCH */}
          <Card title="Thông tin giao dịch">
            <Descriptions column={1} bordered>
              {Object.entries(invoice || {}).map(([key, value]) => (
                <Descriptions.Item label={key} key={key}>
                  {String(value)}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </Card>
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Button className="home-btn" href="/" key="home">
              Về trang chủ
            </Button>
          </div>
        </>
      ) : (
        <Result
          status="error"
          title="Thanh toán thất bại"
          subTitle={error || 'Giao dịch không hợp lệ'}
          extra={[
            <Button href="/" key="home">
              Về trang chủ
            </Button>,
          ]}
        />
      )}
    </div>
  );
}
