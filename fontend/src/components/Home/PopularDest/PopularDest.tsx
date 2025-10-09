import { Tabs } from "antd";
import Container from "@/components/Share/Container";
import "./PopularDest.css";

const { TabPane } = Tabs;

const regions = {
  "Miền Bắc": [
    { name: "Hà Nội", image: "" },
    { name: "Hạ Long", image: "" },
    { name: "Sa Pa", image: "" },
    { name: "Ninh Bình", image: "" },
  ],
  "Miền Trung": [
    { name: "Đà Nẵng", image: "" },
    { name: "Huế", image: "" },
    { name: "Nha Trang", image: "" },
    { name: "Quy Nhơn", image: "" },
  ],
  "Tây Nguyên": [
    { name: "Đà Lạt", image: "" },
    { name: "Buôn Ma Thuột", image: "" },
    { name: "Pleiku", image: "" },
  ],
  "Miền Nam": [
    { name: "TP. Hồ Chí Minh", image: "" },
    { name: "Phú Quốc", image: "" },
    { name: "Cần Thơ", image: "" },
    { name: "Vũng Tàu", image: "" },
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
