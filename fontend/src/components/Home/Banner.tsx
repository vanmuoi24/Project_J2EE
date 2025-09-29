import banner from '@/assets/images/banner.webp'
import { CreditCardOutlined, CarOutlined, HomeOutlined, SendOutlined, FullscreenExitOutlined} from '@ant-design/icons';
import { Tabs } from 'antd';


const Banner = () => {
  return (
    <div style={{position: 'relative'}}>
      <div><img src={banner} alt="" /></div>
      <div style={{position: 'absolute', width: '80%', left: '50%', top: '100%', transform: 'translate(-50%, -50%)',  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'}}>
         <div style={{backgroundColor: '#fff', borderRadius: 10}}> 
            <Tabs
            defaultActiveKey="2"
            items={[CreditCardOutlined, CarOutlined,HomeOutlined, SendOutlined, FullscreenExitOutlined].map((Icon, i) => {
               const id = String(i + 1);
               return {
                  key: id,
                  label: `Tab ${id}`,
                  children: `Tab ${id}`,
                  icon: <Icon />,
                  };
               })}
               />
         </div>
      </div>
    </div>  
  )
}

export default Banner