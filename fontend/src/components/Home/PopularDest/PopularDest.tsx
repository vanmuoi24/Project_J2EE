import { Tabs } from "antd";
import Container from "@/components/Share/Container";
import "./PopularDest.css";

const { TabPane } = Tabs;

const regions = {
  "Miền Bắc": [
    { name: "Hà Nội", image: "https://picsum.photos/400/250?random=21" },
    { name: "Hạ Long", image: "https://picsum.photos/400/250?random=22" },
    { name: "Sa Pa", image: "https://picsum.photos/400/250?random=23" },
    { name: "Ninh Bình", image: "https://picsum.photos/400/250?random=24" },
  ],
  "Miền Trung": [
    { name: "Đà Nẵng", image: "https://picsum.photos/400/250?random=25" },
    { name: "Huế", image: "https://picsum.photos/400/250?random=26" },
    { name: "Nha Trang", image: "https://picsum.photos/400/250?random=27" },
    { name: "Quy Nhơn", image: "https://picsum.photos/400/250?random=28" },
  ],
  "Tây Nguyên": [
    { name: "Đà Lạt", image: "https://picsum.photos/400/250?random=29" },
    { name: "Buôn Ma Thuột", image: "https://picsum.photos/400/250?random=30" },
    { name: "Pleiku", image: "https://picsum.photos/400/250?random=31" },
  ],
  "Miền Nam": [
    { name: "TP. Hồ Chí Minh", image: "https://picsum.photos/400/250?random=32" },
    { name: "Phú Quốc", image: "https://picsum.photos/400/250?random=33" },
    { name: "Cần Thơ", image: "https://picsum.photos/400/250?random=34" },
    { name: "Vũng Tàu", image: "https://picsum.photos/400/250?random=35" },
  ],
};

export const PopularDest = () => {
  return (
    <div style={{ background: "#fff", padding: "50px 0" }}>
      <Container>
        {/* Title + Description */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#0b5da7",
              marginBottom: 8,
            }}
          >
            Popular Destinations
          </h2>
          <div
            style={{
              width: 60,
              height: 4,
              backgroundColor: "#0b5da7",
              borderRadius: 2,
              margin: "0 auto 16px",
            }}
          />
          <p
            style={{
              fontSize: 18,
              color: "#444",
              maxWidth: 720,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Discover Vietnam’s most beloved travel destinations, from vibrant
            cities to stunning beaches and mountains.
          </p>
        </div>

        {/* Tabs */}
        <Tabs centered defaultActiveKey="Miền Bắc">
          {Object.entries(regions).map(([region, provinces]) => (
            <TabPane tab={region} key={region}>
              <div className="dest-grid">
                {provinces.map((province) => (
                  <div key={province.name} className="dest-card">
                    <img
                      src={province.image}
                      alt={province.name}
                      className="dest-img"
                    />
                    <div className="overlay" />
                    <h4 className="dest-name">{province.name}</h4>
                    <button className="discovery-btn">Discovery</button>
                  </div>
                ))}
              </div>
            </TabPane>
          ))}
        </Tabs>
      </Container>
    </div>
  );
};
