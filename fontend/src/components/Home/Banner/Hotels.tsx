import { MinusOutlined, MoonOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Divider, Flex, Input, message, Popover } from "antd"
import type { DatePickerProps } from "antd/lib";
import dayjs, { Dayjs } from 'dayjs'
import { useState } from "react";



const Hotels = () => {
  const [checkIn, setCheckIn] = useState<Dayjs | null>(dayjs());  
  const [checkOut, setCheckOut] = useState<Dayjs | null>(dayjs().add(1, "day"));
  const [rooms, setRooms] = useState<number>(1);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);


  const nights = checkIn && checkOut ? checkOut.diff(checkIn, "day") : 0;

  const onChangeCheckIn: DatePickerProps["onChange"] = (date) => {
    setCheckIn(date);
  };

  const onChangeCheckOut: DatePickerProps["onChange"] = (date) => {
    setCheckOut(date);
  };

  const LIMITS = {
    rooms: { min: 1, max: 9 },
    adults: { min: 1, max: 9 },
    children: { min: 0, max: 9 },
  };

  const guestContent = (
    <div style={{ width: 260 }}>
      {/* Rooms */}
      <Flex justify="space-between" align="center" style={{ marginBottom: 8 }}>
        <span>Rooms</span>
        <div>
          <Button
            size="small"
            icon={<MinusOutlined />}
            disabled={rooms <= LIMITS.rooms.min}
            onClick={() => updateRooms(rooms - 1)}
          />
          <span style={{ margin: "0 12px" }}>{rooms}</span>
          <Button
            size="small"
            icon={<PlusOutlined />}
            disabled={rooms >= LIMITS.rooms.max}
            onClick={() => updateRooms(rooms + 1)}
          />
        </div>
      </Flex>

      {/* Adults */}
      <Flex justify="space-between" align="center" style={{ marginBottom: 8 }}>
        <span>Adults (12+)</span>
        <div>
          <Button
            size="small"
            icon={<MinusOutlined />}
            disabled={adults <= LIMITS.adults.min}
            onClick={() => updateAdults(adults - 1)}
          />
          <span style={{ margin: "0 12px" }}>{adults}</span>
          <Button
            size="small"
            icon={<PlusOutlined />}
            disabled={adults >= LIMITS.adults.max}
            onClick={() => updateAdults(adults + 1)}
          />
        </div>
      </Flex>

      {/* Children */}
      <Flex justify="space-between" align="center">
        <span>Children (0-12)</span>
        <div>
          <Button
            size="small"
            icon={<MinusOutlined />}
            disabled={children <= LIMITS.children.min}
            onClick={() => updateChildren(children - 1)}
          />
          <span style={{ margin: "0 12px" }}>{children}</span>
          <Button
            size="small"
            icon={<PlusOutlined />}
            disabled={children >= LIMITS.children.max}
            onClick={() => updateChildren(children + 1)}
          />
        </div>
      </Flex>
    </div>
  );

  const updateRooms = (value: number) => {
    if (value > rooms && adults < value) {
      setAdults(value);
    }
    setRooms(value);
  };

  const updateAdults = (value: number) => {
    if (value < rooms) {
      message.warning("Số người lớn phải >= số phòng");
      return;
    }
    setAdults(value);
  };

  const updateChildren = (value: number) => {
    setChildren(value);
  };

 
  return (
    <div>
      <Flex vertical={false} style={{padding: '8px 12px'}}>
        <div style={{flex: 3}}>
          <p style={{margin: '0 0 4px 0', fontSize: 16, fontWeight: 500}}>Locations<span style={{color: 'red'}}>*</span></p>
          <Input style={{padding: 0, fontSize: 16, fontWeight: 500}} allowClear placeholder="Hotels, destinations, cities,..." variant="borderless" />
        </div>

        <Divider type="vertical" style={{height: 70, width: 1, margin: '0 12px'}}/>
        <div style={{display: 'flex', gap: 10}}>
          <div style={{flex: 4}}>
              <p style={{margin: '0 0 4px 0', fontSize: 16, fontWeight: 500}}>Check in</p>
              <DatePicker format="dddd, DD/MM/YYYY" style={{padding: 0, fontSize: 18, fontWeight: 500}} variant="borderless" suffixIcon="" onChange={onChangeCheckIn} defaultValue={dayjs()}  value={checkIn}/>
          </div>
          <p style={{width: 46, height: 46, borderRadius: '50%', backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000', fontSize: 16, boxShadow: '0px 0px 8px #cdcdcdff', marginRight: 8 }}>
             {nights} <MoonOutlined style={{ marginLeft: 4 }} />
          </p>
          <div style={{flex: 4}}>
              <p style={{margin: '0 0 4px 0', fontSize: 16, fontWeight: 500}}>Check out</p>
              <DatePicker format="dddd, DD/MM/YYYY" style={{padding: 0, fontSize: 18, fontWeight: 500}} variant="borderless" suffixIcon="" onChange={onChangeCheckOut} defaultValue={dayjs()}  value={checkOut}/>
          </div>
        </div>
        
        <Divider type="vertical" style={{height: 70, width: 1, margin: '0 11px 0 12px'}}/>
        <div style={{flex: 3, display: 'flex', justifyContent: 'space-between'}}>
          <Popover placement="bottomRight" trigger="click" content={guestContent}>
            <div style={{ cursor: "pointer", paddingLeft: 11 }}>
              <p style={{ margin: "0 0 4px 0", fontSize: 16, fontWeight: 500 }}>Guests</p>
              <p style={{ margin: 0, fontSize: 15 }}>
                {rooms} room • {adults} adults • {children} children
              </p>
            </div>
          </Popover>
          <Button style={{height: '100%'}} ><SearchOutlined style={{fontSize: 20, padding: '0 6px'}}/></Button>
        </div>
      </Flex>
    </div>
  )
}

export default Hotels