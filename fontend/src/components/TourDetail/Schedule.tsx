import { useEffect, useState } from "react";
import { Calendar, Button, Row, Col, List, Card, ConfigProvider, Typography } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import viVN from "antd/locale/vi_VN";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import type { IDepartureResponse } from "@/types/Tour";
import { getDepartureByTourId } from "@/services/tourServices";

dayjs.locale("vi");

const { Title, Text } = Typography;

interface ScheduleProps {
  tourId?: number;
  basePrice?: number;
}

export default function Schedule({ tourId, basePrice }: ScheduleProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>();
  const [currentDate, setCurrentDate] = useState(dayjs(""));
  const [specialDates, setSpecialDates] = useState<Record<string, string>>({});
  const [hoverDate, setHoverDate] = useState<string | null>(null);
  const [specialMonths, setSpecialMonths] = useState<string[]>([]);
  
  const fechDataDepartureById = async () => {
    const res = await getDepartureByTourId(Number(tourId));
    const data: IDepartureResponse = res;
    const newSpecialDates: Record<string, string> = {};
    const monthsWithDepartures = new Set<string>();

    data.result.forEach(dep => {
      const date = dayjs(dep.departureDate);
      const dateKey = dayjs(dep.departureDate).format("YYYY-MM-DD");
      newSpecialDates[dateKey] = basePrice !== undefined
        ? `${(basePrice / 1000).toLocaleString("en-US")}K`
        : "";

      monthsWithDepartures.add(date.format("YYYY-MM"));
    });
    const monthArray = Array.from(monthsWithDepartures);
    setSpecialDates(newSpecialDates);
    setSpecialMonths(monthArray);

    if (monthArray.length>0 && !selectedMonth){
      setSelectedMonth(monthArray[0]);
      const [m, y] = monthArray[0].split("/");
      setCurrentDate(dayjs(`${y}-${m}-01`));
    }

  };

  useEffect(() => {
    fechDataDepartureById();
  }, [tourId, basePrice]);


  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    const [m, y] = month.split("/");
    setCurrentDate(dayjs(`${y}-${m}-01`));
  };

  //  Hàm render danh sách tháng
  const renderMonthSelector = () => (
    <Card
      styles={{ body: { padding: 10 } }}
      style={{ width: "100%", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          whiteSpace: "pre-line",
          textAlign: "center",
          display: "block",
          margin: "12px 0"
        }}
      >
        Chọn tháng
      </Text>

      <List
        dataSource={specialMonths}
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
                fontSize: 16
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
          fullCellRender={dateCellRender}
          headerRender={({ value }) => {
            const month = dayjs(value).month();
            const year = dayjs(value).year();

            const prevMonthStr = dayjs(value).subtract(1, "month").format("YYYY-MM");
            const nextMonthStr = dayjs(value).add(1, "month").format("YYYY-MM");

            const canGoPrev = specialMonths?.includes(prevMonthStr);
            const canGoNext = specialMonths?.includes(nextMonthStr);
            
            return (
              <div style={{ textAlign: "center", marginBottom: 10 }}>
                <Button
                  size="large"
                  disabled={!canGoPrev}
                  onClick={() => {
                    const prevMonth = dayjs(currentDate).subtract(1, "month").format("YYYY-MM");
                    handleMonthSelect(prevMonth);
                  }}
                  style={{
                    marginRight: 10,
                    border: "none",
                    backgroundColor: canGoPrev ? "#F0F0F0" : "#ddd",
                    borderRadius: 50,
                  }}
                  icon={<ArrowLeftOutlined style={{ fontSize: 18 }} />}
                />
                <span style={{ fontWeight: "bold", fontSize: 20, color: "#155790" }}>
                  THÁNG {month + 1}/{year}
                </span>
                <Button
                  size="large"
                  disabled={!canGoNext}
                  onClick={() => {
                    const nextMonth = dayjs(currentDate).add(1, "month").format("YYYY-MM");
                    handleMonthSelect(nextMonth);
                  }}
                  style={{
                    marginLeft: 10,
                    border: "none",
                    backgroundColor: canGoNext ? "#F0F0F0" : "#ddd",
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
    const isHover = hoverDate === dateStr;

    return (
      <div
        onMouseEnter={() => setHoverDate(dateStr)}
        onMouseLeave={() => setHoverDate(null)}
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
          border: isSpecial && isHover ? "1px solid red" : "1px solid transparent",
          transition: "all 0.2s",
        }}
      >
        {/* Ngày */}
        <div style={{ fontWeight: isSpecial ? "bold" : "450", fontSize: 16 }}>
          {dayjs(value).date()}
        </div>

        {/* Giá */}
        <div style={{ fontSize: 14, fontWeight: "700", color: isSpecial ? "#E01600" : "transparent" }}>
          {isSpecial || "—"}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Title level={4} style={{ textAlign: "center", marginTop: 38, marginBottom: 18, fontWeight: 700 }}>
        LỊCH KHỞI HÀNH
      </Title>
      <Row gutter={17}>
        <Col span={4}>{renderMonthSelector()}</Col>
        <Col span={20}>{renderCalendar()}</Col>
      </Row>
    </div>

  );
}


