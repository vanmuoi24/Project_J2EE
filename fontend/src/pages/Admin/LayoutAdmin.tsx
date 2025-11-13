import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BugOutlined,
  GiftOutlined,
  UserOutlined,
  GlobalOutlined,
  ScheduleOutlined,
  StarOutlined,
  UnorderedListOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Space, Avatar, Button } from "antd";
import type { MenuProps } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const { Content, Sider } = Layout;

const AdminSidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("/admin");
  const location = useLocation();
  const navigate = useNavigate();

  // Cập nhật menu active theo route
  useEffect(() => {
    setActiveMenu(location.pathname || "/admin");
  }, [location.pathname]);

  // Menu bên sidebar
  const menuItems: MenuProps["items"] = [
    {
      key: "/admin/managerUser",
      icon: <UserOutlined />,
      label: <Link to="/admin/managerUser">Quản lý người dùng</Link>,
    },
    {
      key: "/admin/managerTour",
      icon: <GlobalOutlined />,
      label: "Quản lý tour du lịch",
      children: [
        {
          key: "/admin/managerTour/list",
          icon: <UnorderedListOutlined />,
          label: <Link to="/admin/managerTour/list">Danh sách tour</Link>,
        },
        {
          key: "/admin/managerTour/itinerary",
          icon: <CalendarOutlined />,
          label: <Link to="/admin/managerTour/itinerary">Lịch trình</Link>,
        },
        {
          key: "/admin/managerTour/destination",
          icon: <EnvironmentOutlined />,
          label: <Link to="/admin/managerTour/destination">Điểm đến</Link>,
        },
        {
          key: "/admin/managerTour/pricing",
          icon: <DollarOutlined />,
          label: <Link to="/admin/managerTour/pricing">Giá & khuyến mãi</Link>,
        },
        {
          key: "/admin/managerTour/booking",
          icon: <ScheduleOutlined />,
          label: <Link to="/admin/managerTour/booking">Booking theo tour</Link>,
        },
        {
          key: "/admin/managerTour/guides",
          icon: <TeamOutlined />,
          label: <Link to="/admin/managerTour/guides">Hướng dẫn viên</Link>,
        },
        {
          key: "/admin/managerTour/reviews",
          icon: <StarOutlined />,
          label: <Link to="/admin/managerTour/reviews">Đánh giá tour</Link>,
        },
      ],
    },
    {
      key: "/admin/managerBooking",
      icon: <ScheduleOutlined />,
      label: <Link to="/admin/managerBooking">Quản lý đặt chỗ</Link>,
    },
    {
      key: "/admin/managerPromotion",
      icon: <GiftOutlined />,
      label: <Link to="/admin/managerPromotion">Quản lý khuyến mãi</Link>,
    },
    {
      key: "/admin/managerInvoice",
      icon: <GiftOutlined />,
      label: <Link to="/admin/managerInvoice">Quản lý hóa đơn</Link>,
    },
  ];

  // Menu dropdown account
  const itemsDropdown: MenuProps["items"] = [
    {
      key: "home",
      label: <Link to="/">Trang chủ</Link>,
    },
    {
      key: "logout",
      label: (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => {
            localStorage.clear();
            navigate("/login", { replace: true });
          }}
        >
          Đăng xuất
        </span>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", position: "relative" }}>
      {/* Sidebar */}
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250} // 👉 chiều rộng khi mở
        collapsedWidth={80} //
      >
        <div
          style={{
            height: 32,
            margin: 16,
            textAlign: "center",
            fontWeight: "bold",
            color: "#1890ff",
          }}
        >
          <BugOutlined /> {!collapsed && "Hệ Thống Quản Trị"}
        </div>
        <Menu
          selectedKeys={[activeMenu]}
          mode="inline"
          items={menuItems}
          onClick={(e) => setActiveMenu(e.key)}
        />
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: 20,
            padding: "0 1rem",
            alignItems: "center",
            height: 64,
            background: "#fff",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
          <Dropdown menu={{ items: itemsDropdown }} trigger={["click"]}>
            <Space style={{ cursor: "pointer" }}>
              Welcome Admin <Avatar>A</Avatar>
            </Space>
          </Dropdown>
        </div>

        {/* Nội dung */}
        <Content
          style={{
            padding: "1rem",
            overflow: "hidden",
            height: "calc(100vh - 64px)",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "100%",
              overflowY: "auto",
              paddingRight: 0,
              position: "relative",
            }}
            className="custom-scrollbar"
          >
            {location.pathname === "/" ? (
              // 👇 Banner chữ chạy
              <div
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#1890ff",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    animation: "marquee 12s linear infinite",
                  }}
                >
                  🚀 Chào mừng bạn đến với trang quản trị – Quản lý dữ liệu dễ
                  dàng 🚀
                </div>

                {/* CSS cho animation chữ chạy và ẩn scrollbar */}
                <style>
                  {`
                    @keyframes marquee {
                      0% { transform: translateX(100%); }
                      100% { transform: translateX(-100%); }
                    }
                    
                    .custom-scrollbar {
                      scrollbar-width: none !important;
                      -ms-overflow-style: none !important;
                    }
                    
                    .custom-scrollbar::-webkit-scrollbar {
                      display: none !important;
                      width: 0 !important;
                      height: 0 !important;
                    }
                    
                    .custom-scrollbar::-webkit-scrollbar-track {
                      display: none !important;
                    }
                    
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                      display: none !important;
                    }
                    
                    /* Đảm bảo modal có mask đẹp và vẫn scroll được */
                    .ant-modal-wrap {
                      overflow: auto !important;
                    }
                    
                    .ant-modal-mask {
                      position: fixed !important;
                      background-color: rgba(0, 0, 0, 0.5) !important;
                    }
                    
                    .ant-modal {
                      position: fixed !important;
                    }
                    
                    /* Đảm bảo body vẫn có thể scroll khi modal mở */
                    body.ant-scrolling-effect {
                      overflow: auto !important;
                      padding-right: 0 !important;
                    }
                    
                    /* Ngăn body bị lock khi modal mở */
                    .ant-modal-open {
                      overflow: auto !important;
                    }
                  `}
                </style>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminSidebar;
