import { Row, Col, Card, Modal } from "antd";
import PersonalInfo from "@/components/Booking/PersonalInfo";
import ListOfCustomerInfo from "@/components/Booking/ListOfCustomerInfo";
import BookingTitle from "@/components/Booking/BookingTitle";
import TourDetailCard from "@/components/TourDetail/TourDetailCard";
import Itinerary from "@/components/TourDetail/Itinerary";
import ImportantInfo from "@/components/TourDetail/ImportantInfo";
import BookingExpense from "@/components/Booking/BookingExpense";
import { createBooking } from '@/services/bookingServices';
import { sessionService } from '@/services/sessionServices';
// ...existing unused tour detail components removed

export default function BookingLayout() {
  // form instances exposed by children
  let personalForm: any = null;
  let customersForm: any = null;

  const handlePersonalFormReady = (f: any) => {
    personalForm = f;
  };

  const handleCustomersFormReady = (f: any) => {
    customersForm = f;
  };

  const handleConfirm = async () => {
    try {
      // validate both forms
      await personalForm.validateFields();
      const customersValues = await customersForm.validateFields();

      // customersValues has { customers: [...] }
      const customers = customersValues.customers || [];

      // build booking request
      const user = sessionService.getUser();
      const bookingRequest = {
        userId: user?.id?.toString() || sessionService.getToken() || '',
        tourDepartureId: "1", // TODO: replace with real tourDepartureId from route
        listOfCustomers: customers.map((c: any) => ({
          fullName: c.fullName,
          birthdate: c.birthDate ? c.birthDate.format('YYYY-MM-DD') : undefined,
          address: c.address,
          gender: c.gender === 'male' ? 'Male' : 'Female',
        })),
      };

      // Log bookingRequest for debugging
      console.log('bookingRequest', bookingRequest);

      const res = await createBooking(bookingRequest as any);
      Modal.success({ title: 'Đặt tour thành công', content: res.message || 'Booking created' });
    } catch (err: any) {
      Modal.error({ title: 'Lỗi', content: err?.message || 'Đã xảy ra lỗi' });
    }
  };

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
            <ListOfCustomerInfo onFormReady={handleCustomersFormReady} />
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
            }}
          >
            <BookingExpense
              total={268650000}
              items={[
                { label: "Người lớn", quantity: 1, price: 99500000 },
                { label: "Trẻ em", quantity: 2, price: 84575000 },
              ]}
              singleRoomSurcharge={0}
              onConfirm={handleConfirm}
            />
          </Card>

        </Col>
      </Row>
    </div>
  );
}
