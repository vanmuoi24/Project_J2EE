import { MoonOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Divider, Flex, Input, Select, type SelectProps } from "antd"
import type { DatePickerProps } from "antd/lib";
import dayjs from 'dayjs'



const Hotels = () => {
  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log("onChangeDate: ",date, dateString);
  };
    const onChangePrice: SelectProps['onChange'] = (value) => {
    console.log('onChangePrice: ',value);
  };
  const dataRangePrices = [
    { value: '<5', label: 'Dưới 5 triệu' },
    { value: '5-10', label: 'Từ 5 đến 10 triệu' },
    { value: '10-20', label: 'Từ 10 đến 20 triệu' },
    { value: '>20', label: 'Trên 20 triệu' },
  ]
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
              <DatePicker format="dddd, DD/MM/YYYY" style={{padding: 0, fontSize: 18, fontWeight: 500}} variant="borderless" suffixIcon="" onChange={onChangeDate} defaultValue={dayjs()}/>
          </div>
          <p style={{width: 46, height: 46, borderRadius: '50%', backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000', fontSize: 16, boxShadow: '0px 0px 8px #cdcdcdff', marginRight: 8 }}>
            2 
            <MoonOutlined style={{marginLeft: 4}} />
          </p>
          <div style={{flex: 4}}>
              <p style={{margin: '0 0 4px 0', fontSize: 16, fontWeight: 500}}>Check out</p>
              <DatePicker format="dddd, DD/MM/YYYY" style={{padding: 0, fontSize: 18, fontWeight: 500}} variant="borderless" suffixIcon="" onChange={onChangeDate} defaultValue={dayjs()}/>
          </div>
        </div>
        
        <Divider type="vertical" style={{height: 70, width: 1, margin: '0 11px 0 12px'}}/>
        <div style={{flex: 3, display: 'flex', justifyContent: 'space-between'}}>
          <div>
            <p style={{margin: '0 0 4px 0', fontSize: 16, fontWeight: 500, padding: '0 0 0 11px'}}>Price range</p>
            <Select
              defaultValue="<5"
              style={{ width: 180}}
              variant="borderless"
              onChange={onChangePrice}
              options={dataRangePrices}
            />
          </div>
          <Button style={{height: '100%'}} ><SearchOutlined style={{fontSize: 20, padding: '0 6px'}}/></Button>
        </div>
      </Flex>
    </div>
  )
}

export default Hotels