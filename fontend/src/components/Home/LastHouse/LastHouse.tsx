import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "@/components/Share/Container";
import {
  EnvironmentOutlined,
  CalendarOutlined,
  FieldTimeOutlined,
  TeamOutlined,
  NumberOutlined,
  ClockCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { getAllTours } from "@/services/tourServices";

const NextArrow = (props: React.ComponentPropsWithoutRef<'div'> & { onClick?: () => void }) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        right: -40,
        top: "40%",
        transform: "translateY(-50%)",
        fontSize: 28,
        color: "#0b5da7",
        cursor: "pointer",
        background: "#fff",
        borderRadius: "50%",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        width: 50,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
      }}
    >
      <RightOutlined />
    </div>
  );
};

const PrevArrow = (props: React.ComponentPropsWithoutRef<'div'> & { onClick?: () => void }) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        left: -40,
        top: "40%",
        transform: "translateY(-50%)",
        fontSize: 28,
        color: "#0b5da7",
        cursor: "pointer",
        background: "#fff",
        borderRadius: "50%",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        width: 50,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
      }}
    >
      <LeftOutlined />
    </div>
  );
};

export const LastHouse = () => {
   


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipe: false,       
  draggable: false,  
   nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  };

// Fake data deals
const deals = [
  {
    id: "NDSGN1064-054-031025VU-V-1",
    name: "Tour Singapore - Malaysia",
    from: "TP. Hồ Chí Minh",
    date: "03/10/2025",
    duration: "4N3Đ",
    seats: 4,
    price: "8,500,000₫",
    image: "",
    saleEnd: new Date().getTime() + 1000 * 60 * 60 * 24, // 24h
  },
  {
    id: "NDSGN1064-055-041025VU-V-2",
    name: "Tour Thái Lan - Bangkok - Pattaya",
    from: "TP. Hồ Chí Minh",
    date: "04/10/2025",
    duration: "5N4Đ",
    seats: 6,
    price: "6,900,000₫",
    image: "",
    saleEnd: new Date().getTime() + 1000 * 60 * 90, // 90 phút
  },
  {
    id: "NDHNI1064-056-051025VU-V-3",
    name: "Tour Hàn Quốc - Seoul - Nami",
    from: "Hà Nội",
    date: "05/10/2025",
    duration: "6N5Đ",
    seats: 10,
    price: "12,300,000₫",
    image: "",
    saleEnd: new Date().getTime() + 1000 * 60 * 60 * 12, // 12h
  },
  {
    id: "NDHNI1064-057-061025VU-V-4",
    name: "Tour Nhật Bản - Tokyo - Osaka",
    from: "Hà Nội",
    date: "06/10/2025",
    duration: "7N6Đ",
    seats: 8,
    price: "19,900,000₫",
    image: "",
    saleEnd: new Date().getTime() + 1000 * 60 * 45, // 45 phút
  },
  {
    id: "NDDAD1064-058-071025VU-V-5",
    name: "Tour Đà Nẵng - Hội An",
    from: "Đà Nẵng",
    date: "07/10/2025",
    duration: "3N2Đ",
    seats: 15,
    price: "3,500,000₫",
    image: "",
    saleEnd: new Date().getTime() + 1000 * 60 * 60 * 48, // 2 ngày
  },
  {
    id: "NDSGN1064-059-081025VU-V-6",
    name: "Tour Phú Quốc nghỉ dưỡng",
    from: "TP. Hồ Chí Minh",
    date: "08/10/2025",
    duration: "4N3Đ",
    seats: 12,
    price: "5,200,000₫",
    image: "",
    saleEnd: new Date().getTime() + 1000 * 60 * 10, // 10 phút
  },
  {
    id: "NDHNI1064-060-091025VU-V-7",
    name: "Tour Châu Âu - Pháp - Ý - Thuỵ Sĩ",
    from: "Hà Nội",
    date: "09/10/2025",
    duration: "10N9Đ",
    seats: 5,
    price: "59,000,000₫",
    image: "",
    saleEnd: new Date().getTime() + 1000 * 60 * 60 * 3, // 3h
  },
  {
    id: "NDSGN1064-061-101025VU-V-8",
    name: "Tour Dubai - Sa mạc Safari",
    from: "TP. Hồ Chí Minh",
    date: "10/10/2025",
    duration: "6N5Đ",
    seats: 7,
    price: "35,000,000₫",
    image: "",
    saleEnd: new Date().getTime() + 1000 * 30, // 30 giây
  },
];

const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});
  const getTours = async () => {
    await getAllTours()
  }  
useEffect(()=> {
    getTours()
  }, [])
  // Countdown xử lý
  useEffect(() => {
    const interval = setInterval(() => {
      const updated: { [key: string]: string } = {};
      deals.forEach((deal) => {
        const diff = deal.saleEnd - new Date().getTime();
        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          updated[deal.id] = `${hours}h ${minutes}m ${seconds}s`;
        } else {
          updated[deal.id] = "Hết hạn";
        }
      });
      setTimeLeft(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{ 
      background: '#dcefff', padding: '30px 0'
    }}>
      <Container>
         <div style={{ marginBottom: 12 }}>
         <h2
            style={{
               fontSize: 32,
               fontWeight: 700,
               color: "#0b5da7",
               marginBottom: 8,
            }}
         >
            Last-Minute Deals
         </h2>
         <div
            style={{
               width: 60,
               height: 4,
               backgroundColor: "#0b5da7",
               borderRadius: 2,
            }}
         />
         </div>

         {/* Description */}
         <p
         style={{
            fontSize: 20,
            lineHeight: 1.6,
            color: "#444",
            marginBottom: 24,
            maxWidth: 720,
         }}
         >
         Act fast and seize the final discount—book now before it’s gone!
         </p>

               <Slider {...settings}>
        {deals.map((deal) => (
          <div key={deal.id} style={{ padding: "0 8px" }}>
            <div
              style={{
                border: "1px solid #eee",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                width: '97%'
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={deal.image}
                  alt={deal.name}
                  style={{ width: "100%", height: 200, objectFit: "cover" }}
                />
                {/* Countdown sale */}
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "rgba(255,0,0,0.8)",
                    color: "#fff",
                    padding: "4px 10px",
                    borderRadius: 6,
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  <ClockCircleOutlined style={{ marginRight: 4 }} />
                  {timeLeft[deal.id] || "..."}
                </div>
              </div>

              <div style={{ padding: "16px" }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                  {deal.name}
                </h3>
                <p style={{ margin: "4px 0" }}>
                  <NumberOutlined /> <b>ID:</b> {deal.id}
                </p>
                <p style={{ margin: "4px 0" }}>
                  <EnvironmentOutlined /> <b>Departs from:</b> {deal.from}
                </p>
                <p style={{ margin: "4px 0" }}>
                  <CalendarOutlined /> <b>Departure dates:</b> {deal.date}
                </p>
                <p style={{ margin: "4px 0" }}>
                  <FieldTimeOutlined /> <b>Duration:</b> {deal.duration}
                </p>
                <p style={{ margin: "4px 0" }}>
                  <TeamOutlined /> <b>Remaining seats:</b> {deal.seats}
                </p>

                {/* Price + Booking */}
                <div
                  style={{
                    marginTop: 12,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#e63946",
                    }}
                  >
                    {deal.price}
                  </span>
                  <Button type="primary">Booking</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div style={{ textAlign: "center", marginTop: 32 }}>
         <Button
            type="primary"
            size="large"
            style={{
               backgroundColor: "#0b5da7",
               borderColor: "#0b5da7",
               borderRadius: 8,
               padding: "0 32px",
               height: 48,
               fontSize: 16,
               fontWeight: 600,
            }}
            // onClick={Navigate('/deals')}
            onClick={()=>alert("sẽ chuyển sang route /deals")}
         >
            View All Deals
         </Button>
      </div>
      </Container>
    </div>
  );
};
