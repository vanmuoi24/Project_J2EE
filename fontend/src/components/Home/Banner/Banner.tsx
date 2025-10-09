import banner from '@/assets/images/banner.webp';
import { Tabs } from 'antd';

import visa from '@/assets/icons/visa.png';
import hotels from '@/assets/icons/hotels.png';
import tours from '@/assets/icons/tours.png';
import flights from '@/assets/icons/flights.png';
import dots from '@/assets/icons/dots.png';

import type { TabsProps } from 'antd/lib';
import Tours from './Tours';
import Hotels  from './Hotels';
import Flights from './Flights';
import Combos from './Combos';

type TabItemProps = {
  icon: string,
  label: string,
}

const TabItem: React.FC<TabItemProps> = ({icon, label}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <img src={icon} alt={label} style={{ width: 24, height: 24 }} />
      <span style={{fontSize: 15, fontWeight: 500}}>{label}</span>
    </div>
  )
}

const Banner = () => {

  const tabItems : TabsProps['items'] = [
        { key: '1', children: 'Tab 1', label: <TabItem icon={visa} label='Visa'/> },
        { key: '2', children: <Tours/>, label: <TabItem icon={tours} label='Tours'/> },
        { key: '3', children: <Hotels/>, label: <TabItem icon={hotels} label='Hotels'/> },
        { key: '4', children: <Flights/>, label: <TabItem icon={flights} label='Flights'/> },
        { key: '5', children: <Combos/>, label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src={tours} alt="Tours" style={{ width: 24, height: 24 }} /> +
            <img src={flights} alt="Flights" style={{ width: 24, height: 24 }} /> +
            <img src={hotels} alt="Hotels" style={{ width: 24, height: 24 }} />
            <span style={{fontSize: 15, fontWeight: 500}}>Combos</span>
          </div>
        ) },
        { key: '6', children: 'Tab 6', label: <TabItem icon={dots} label='Additional Services'/>},
  ]

  return (
    <div style={{ position: 'relative', marginBottom: 180 }}>
      <div>
        <img src={banner} alt="" />
      </div>
      <div
        style={{
          position: 'absolute',
          width: '80%',
          left: '50%',
          top: '100%',
          transform: 'translate(-50%, -30%)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        }}
      >
          <div style={{ backgroundColor: '#fff', borderRadius: 10, padding: '0 18px' }}>
          <Tabs
            defaultActiveKey="2"
            items={tabItems}
            centered
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
