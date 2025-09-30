import { Link } from "react-router-dom";
import {  Button, ConfigProvider, Menu, Tabs  } from "antd";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import brand from "@/assets/images/brand.jpg";
import Container from "./Container";
import type { TabsProps } from "antd/lib";
import { useState } from "react";

const Navbar: React.FC = () => {
  const items: TabsProps["items"] = [
  {
    key: "transportations",
    label: "Transportations",
    children: <Menu
          mode="vertical"
          selectable={false}
          style={{
            borderBottom: "none",
            borderInlineEnd: "none",
            backgroundColor: "transparent",
          }}
          items={[
            {
              key: "item1",
              label: (
                <Link
                  to="/"
                  style={{ fontSize: 14, fontWeight: "bold", color: "black"}}
                >
                  Car rental
                </Link>
              ),
            },
            {
              key: "item2",
              label: (
                <Link
                  to="/"
                  style={{ fontSize: 14, fontWeight: "bold", color: "black" }}
                >
                  Flights
                </Link>
              ),
            },
          ]}
        />,
  },
  {
    key: "promotions",
    label: "Promotions",
    children: <Menu
          mode="vertical"
          selectable={false}
          style={{
            borderBottom: "none",
            borderInlineEnd: "none",
            backgroundColor: "transparent",
          }}
          items={[
            {
              key: "item1",
              label: (
                <Link
                  to="/"
                  style={{ fontSize: 14, fontWeight: "bold", color: "black"}}
                >
                  Ưu đãi 1
                </Link>
              ),
            },
            {
              key: "item2",
              label: (
                <Link
                  to="/"
                  style={{ fontSize: 14, fontWeight: "bold", color: "black" }}
                >
                  Ưu đãi 2
                </Link>
              ),
            },
          ]}
        />,
  },
  {
    key: "news",
    label: "News",
    children: <Menu
          mode="vertical"
          selectable={false}
          style={{
            borderBottom: "none",
            borderInlineEnd: "none",
            backgroundColor: "transparent",
          }}
          items={[
            {
              key: "item1",
              label: (
                <Link
                  to="/"
                  style={{ fontSize: 14, fontWeight: "bold", color: "black"}}
                >
                  News
                </Link>
              ),
            },
            {
              key: "item2",
              label: (
                <Link
                  to="/"
                  style={{ fontSize: 14, fontWeight: "bold", color: "black" }}
                >
                  Travel news
                </Link>
              ),
            },
          ]}
        />,
  },
];

  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  return (
    <div
      style={{
        background: "#fff",
        height: 60
      }}
    >
      <Container style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: 'relative',
          height: 60
        }}>
      <div style={{ width: 200, flex: 1}}>
        <div style={{ width: 200}}>
          <Link to="/">
            <img
              src={brand}
              alt="brand"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Link>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Menu
          mode="horizontal"
          selectable
          style={{
            borderBottom: "none",
            flex: 1,  
            height: 60
          }}
          items={[
            {
              key: "home",
              label: (
                <Link
                  to="/"
                  style={{ fontSize: 16, fontWeight: "bold", color: "black" }}
                >
                  Home
                </Link>
              ),
            },
            {
              key: "about",
              label: (
                <Link
                  to="/about"
                  style={{ fontSize: 16, fontWeight: "bold", color: "black" }}
                >
                  About
                </Link>
              ),
            },
          ]}
        />
        <a
            onClick={() => setIsOpen(!isOpen)}
            style={{ color: "black", cursor: "pointer", fontWeight: "bold" }}
          >
            <MenuOutlined />

          </a>
      </div>
      <div style={{
          position: 'absolute',
          width: "97%",
          backgroundColor: '#aaaaaaff',
          top: '110%',
          borderRadius: 8,
          display: isOpen ? 'flex' : 'none',
          justifyContent: 'space-between',
          padding: 8, 
          zIndex: 99
        }}>
            <ConfigProvider
            theme={{
              components: {
                Tabs: {
                  titleFontSize: 16,
                },
              },
            }}
          >
            <Tabs
              defaultActiveKey="transportations"
              tabPosition="left"
              items={items}
              style={{ height: "100%", flex: 1,}}
            />
          </ConfigProvider>
          <Button style={{
            display: 'flex',alignItems: 'center', 
            justifyContent: 'center', 
            backgroundColor: 'transparent', border: 'none'}}
            onClick={()=>setIsOpen(false)}
          >
            <CloseOutlined style={{fontSize: 16, fontWeight: 'bold'}}/>
          </Button>
      </div>
      </Container>
    </div>
  );
};

export default Navbar;
