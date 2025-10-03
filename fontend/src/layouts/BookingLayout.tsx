import { Row, Col, Card } from "antd";
import PersonalInfo from "@/components/Booking/PersonalInfo";
import ListOfCustomerInfo from "@/components/Booking/ListOfCustomerInfo";
import BookingTitle from "@/components/Booking/BookingTitle";
import TourDetailCard from "@/components/TourDetail/TourDetailCard";
import Itinerary from "@/components/TourDetail/Itinerary";
import ImportantInfo from "@/components/TourDetail/ImportantInfo";
import BookingExpense from "@/components/Booking/BookingExpense";
import TourCardProps from "@/components/TourDetail/TourCardProps";
import TourImages from "@/components/TourDetail/TourImage";

export default function BookingLayout() {
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
            <PersonalInfo />
          </Card>

          <Card
            bordered={false}
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <ListOfCustomerInfo />
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
            />
          </Card>

        </Col>
      </Row>
    </div>
  );
}
