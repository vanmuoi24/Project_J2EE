import { Row, Col, Card, Modal } from "antd";
import PersonalInfo from "@/components/Booking/PersonalInfo";
import ListOfCustomerInfo from "@/components/Booking/ListOfCustomerInfo";
import BookingTitle from "@/components/Booking/BookingTitle";
import TourDetailCard from "@/components/TourDetail/TourDetailCard";
import Itinerary from "@/components/TourDetail/Itinerary";
import ImportantInfo from "@/components/TourDetail/ImportantInfo";
import BookingExpense from "@/components/Booking/BookingExpense";
import bookingServices, { createBooking } from '@/services/bookingServices';
import { sessionService } from '@/services/sessionServices';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
// ...existing unused tour detail components removed

export default function BookingLayout() {
  const navigate = useNavigate();
  // use refs so form instances persist across renders
  const personalFormRef = useRef<any>(null);
  const customersFormRef = useRef<any>(null);
  const handlePersonalFormReady = (f: any) => { personalFormRef.current = f; };
  const handleCustomersFormReady = (f: any) => { customersFormRef.current = f; };
  const [expenseItems, setExpenseItems] = useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const tourDepartureId = searchParams.get('departureId') || undefined;

  const computeItemsFromCustomers = (customers: any[]) => {
    if (!customers || customers.length === 0) return [];
    // transform customers into expense items (group by type)
    const summary: Record<string, { label: string; quantity: number; price: number }> = {};
    customers.forEach((c: any) => {
      const type = c.type || 'adult';
      const label = type === 'adult' ? 'Người lớn' : type === 'child' ? 'Trẻ em' : 'Em bé';
      if (!summary[label]) summary[label] = { label, quantity: 0, price: 0 };
      summary[label].quantity += 1;
      // price will be computed by BookingExpense using tourPrice; keep price as 0 fallback
      summary[label].price = summary[label].price || 0;
    });
    return Object.values(summary);
  };

  // === HANDLE BOOKING === //  
  const handleConfirm = async () => {
    try {
      // validate both forms
      await personalFormRef.current.validateFields();
      // If customers list is empty, prefill first customer from personal form
      const currentCustomers = customersFormRef.current.getFieldValue('customers') || [];
      if (!currentCustomers || currentCustomers.length === 0) {
        const personalValues = personalFormRef.current.getFieldsValue();
        // build default customer from personal info
        const defaultCustomer = {
          id: 1,
          type: 'adult',
          fullName: personalValues.fullName || '',
          gender: personalValues.gender || undefined,
          birthDate: personalValues.birthDate || null,
          address: personalValues.address || '',
        };
        customersFormRef.current.setFieldsValue({ customers: [defaultCustomer] });
      }

      const customersValues = await customersFormRef.current.validateFields();

      // customersValues has { customers: [...] }
      const customers = customersValues.customers || [];

      if (customers.length === 0) {
        throw new Error('Phải có ít nhất 1 khách trong danh sách');
      }

      // build booking request
      const user = sessionService.getUser();
      const bookings = bookingServices.getAllBooking();
      sessionStorage.setItem('bookingHistoryCache', JSON.stringify(bookings));

      const bookingRequest = {
        userId: user?.id?.toString() || '',
        tourDepartureId: tourDepartureId || "1",
        listOfCustomers: customers.map((c: any) => ({
          fullName: c.fullName,
          birthdate: c.birthDate ? c.birthDate.format('YYYY-MM-DD') : undefined,
          address: c.address,
          gender: c.gender === 'male' ? 'Male' : 'Female',
        })),
      };

      // Log bookingRequest for debugging
      console.log('bookingRequest', bookingRequest);

      // Gọi Booking API
      const res = await createBooking(bookingRequest as any);

      Modal.success({ title: 'Message', content: 'Booking created' });

      // After successful booking creation, navigate to booking history and pass new booking
      // const newBooking = (res as any).result || (res as any).data?.result || (res as any).data || res;

      // const stored = JSON.parse(sessionStorage.getItem('bookingHistoryCache') || '[]');
      // sessionStorage.setItem('bookingHistoryCache', JSON.stringify([newBooking, ...stored]));

      // navigate(`/invoice/user/${user?.id}`);
      navigate(`/invoice`)

    } catch (err: any) {
      Modal.error({ title: 'Lỗi', content: err?.message || 'Đã xảy ra lỗi' });
    }
  };

  // pass to BookingExpense: update items whenever customers form changes
  const handleCustomersChange = (customers: any[]) => {
    const items = computeItemsFromCustomers(customers);
    setExpenseItems(items);
  };

  // init expenseItems if form already has values
  useEffect(() => {
    const current = customersFormRef.current?.getFieldValue('customers') || [];
    setExpenseItems(computeItemsFromCustomers(current));
  }, []);

  return (
    <div style={{ padding: "24px 10rem", background: "#fff", minHeight: "100vh" }}>
      <Row gutter={[24, 24]} justify="center" align="top">
        <BookingTitle />
      </Row>
      <Row gutter={[24, 24]} justify="center" align="top">
        {/* Cột trái: Booking Info */}
        <Col xs={24} lg={16}>

          <Card
            bordered={false}
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              marginBottom: "16px",
            }}
          >
            <PersonalInfo onFormReady={handlePersonalFormReady} />
          </Card>

          <Card
            bordered={false}
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <ListOfCustomerInfo onFormReady={handleCustomersFormReady} onCustomersChange={handleCustomersChange} />
          </Card>
        </Col>

        {/* Cột phải: Tour Info */}
        <Col xs={24} lg={8}>
          <Card
            bordered={false}
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              marginBottom: "16px",
              width: "25em",
              position: "fixed"
            }}
          >
            <BookingExpense
              total={268650000}
              items={expenseItems}
              singleRoomSurcharge={0}
              onConfirm={handleConfirm}
              tourDepartureId={tourDepartureId ? Number(tourDepartureId) : 1}
            />
          </Card>

        </Col>
      </Row>
    </div>
  );
}
