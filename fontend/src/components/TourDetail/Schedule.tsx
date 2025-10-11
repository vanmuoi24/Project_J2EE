import React, { useState } from "react";
import { Calendar, Button, Row, Col, List, Card, ConfigProvider, Typography } from "antd";
import type { Moment } from "moment";
import moment from "moment";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import viVN from "antd/locale/vi_VN";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

dayjs.locale("vi");

const { Title, Text } = Typography;

const months: string[] = ["10/2025", "11/2025", "12/2025"];

const specialDates: Record<string, string> = {
  "2025-10-01": "7,290K",
  "2025-10-03": "7,990K", 
  "2025-10-08": "7,490K",
  "2025-10-10": "7,990K", 
  "2025-10-15": "7,490K", 
  "2025-10-17": "7,990K", 
  "2025-10-22": "7,790K", 
  "2025-10-24": "7,990K", 
  "2025-10-29": "7,790K",
};

export default function Schedule() {
  const [selectedMonth, setSelectedMonth] = useState<string>("10/2025");
  const [currentDate, setCurrentDate] = useState(dayjs("2025-10-01"));

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    const [m, y] = month.split("/");
    setCurrentDate(dayjs(`${y}-${m}-01`));
  };

  //  Hàm render danh sách tháng
  const renderMonthSelector = () => (
    <Card 
      styles={{ body: { padding: 10 }}} 
      style={{ width: "100%", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
    >
      <Text 
        style={{ 
          fontSize: 16, 
          fontWeight: "bold",
          whiteSpace: "pre-line",
          textAlign: "center",  
          display: "block",  
          margin:"12px 0"
        }}
      >
        Chọn tháng
      </Text>

      <List
        dataSource={months}
        renderItem={(month: string) => (
          <List.Item>
            <Button
              type="text"
              onClick={() => handleMonthSelect(month)}
              block
              style={{
                backgroundColor: selectedMonth === month ? "#155790" : "transparent",
                color: selectedMonth === month ? "#fff" : "#155790",
                fontWeight: "bold",
                height: 48,
                fontSize:16
              }}
            >
              {month}
            </Button>
          </List.Item>
        )}
      />
    </Card>
  );

  //  Hàm render Calendar
  const renderCalendar = () => (
    <Card style={{ width: "100%", boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
      <ConfigProvider locale={viVN}>
        <Calendar
          fullscreen={false}
          value={currentDate}
          onPanelChange={(val) => setCurrentDate(dayjs(val))}
          dateFullCellRender={dateCellRender}
          headerRender={({ value, onChange }) => {
            const month = dayjs(value).month();
            const year = dayjs(value).year();
            return (
              <div style={{ textAlign: "center", marginBottom: 10 }}>
                <Button
                  size="large"
                  onClick={() => onChange(dayjs(value).subtract(1, "month"))}
                  style={{
                    marginRight: 10,
                    border: "none",      
                    backgroundColor: "#F0F0F0",
                    borderRadius: 50,    
                  }}
                  icon={<ArrowLeftOutlined style={{ fontSize: 18 }} />}
                />
                <span style={{ fontWeight: "bold", fontSize:20, color: "#155790" }}>
                  THÁNG {month + 1}/{year}
                </span>
                <Button
                  size="large"
                  onClick={() => onChange(dayjs(value).add(1, "month"))}
                  style={{ 
                    marginLeft: 10, 
                    border: "none",      
                    backgroundColor: "#F0F0F0",
                    borderRadius: 50,    
                  }}
                  icon={<ArrowRightOutlined style={{ fontSize: 18 }} />}
                />                    
              </div>
            );
          }}
        />
      </ConfigProvider>
      <p style={{ color: "#E01600", fontSize: 16, fontStyle: "italic", fontWeight: 400, marginBottom: 0 }}>
        Quý khách vui lòng chọn ngày phù hợp
      </p>
    </Card>
  );

  // Hàm render ô ngày
  const dateCellRender = (value: any) => {
    const dateStr = dayjs(value).format("YYYY-MM-DD");
    const isSpecial = specialDates[dateStr];
    const [hover, setHover] = useState(false);

    return (
    <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "flex",               
          flexDirection: "column",        
          justifyContent: "center",     
          alignItems: "center",           
          width: "100%",                  
          height: "100%",        
          textAlign: "center",
          padding: 6,
          borderRadius: 6,
          cursor: "pointer",
          border: isSpecial && hover ? "1px solid red" : "1px solid transparent", 
          transition: "all 0.2s",
        }}
      >
        {/* Ngày */}
        <div style={{ fontWeight: isSpecial ? "bold" : "450", fontSize: 16 }}>
          {dayjs(value).date()}
        </div>
    
        {/* Giá */}
        <div style={{fontSize: 15, fontWeight: "700", color: isSpecial ? "#E01600" : "transparent" }}>
          {isSpecial || "—"}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Title level={4} style={{ textAlign: "center", marginTop: 38 , marginBottom: 18, fontWeight: 700 }}>
        LỊCH KHỞI HÀNH
      </Title>
      <Row gutter={17}>
        <Col span={4}>{renderMonthSelector()}</Col>
        <Col span={20}>{renderCalendar()}</Col>
      </Row>
    </div>
    
  );
}