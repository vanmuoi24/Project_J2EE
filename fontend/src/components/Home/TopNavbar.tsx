import { Layout, Dropdown, Button, Typography, Space } from "antd";
import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import flag from '@/assets/images/en.png'
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ModalChangeLC from "./Modal/ModalChangeLC";
import  { useState } from "react";
import Container from "./Container";

const { Header } = Layout;

export default function TopNavbar() {
   const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

   const LanguageCurrency = styled.div`
   height: 100%;
   display: flex;
   align-items: center;
   gap: 18px;
   padding: 2px 6px;
   border-radius: 4px;
   cursor: pointer;
   transition: background 0.2s;

   &:hover {
      background: #f0f0f0; /* xám nhạt */
   }
   `;
   const userMenu = [
      {
         key: "login",
         label: <Button type="link" onClick={()=>navigate('/login')}>Đăng nhập</Button>,
        },
        {
          key: "register",
          label: <Button type="link" onClick={()=>navigate('/register')}>Đăng kí</Button>,
      },
   ];

  return (
    <Header style={{ 
      background: '#dcefff', height: '40px'
    }}>
      <Container  style={{display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '40px'}} >
        <Typography.Paragraph style={{ textAlign: "center", marginBottom: 0, fontSize: 13}}>
          
          <PhoneOutlined/>
          <a href="tel:0799664334" style={{color: '#e01600', fontWeight: 'bold'}}> 0799 664 334</a> - Daily: 8:00 AM - 11:00 PM
        </Typography.Paragraph>
        <Space size="large" align="center">
          <LanguageCurrency onClick={()=> setIsOpen(!isOpen)}>
            <img
              src={flag}
              alt="VN"
              style={{ width: 20, height: 20, objectFit: "cover" }}
              />
            <span style={{ fontSize: 13, fontWeight: 'bold', lineHeight: 1 }}>VNĐ</span>
          </LanguageCurrency>        
          <Dropdown menu={{ items: userMenu }} placement="bottomRight" arrow>
            <UserOutlined
              style={{ fontSize: 20, color: "black", cursor: "pointer" }}
              />
          </Dropdown>
        </Space>
        <ModalChangeLC isOpen={isOpen} setIsOpen={setIsOpen} />
      </Container>
    </Header>
  );
}
