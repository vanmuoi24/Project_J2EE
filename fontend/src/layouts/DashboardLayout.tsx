import { Layout, Menu, theme, Button } from "antd"
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons"
import { Link, Outlet } from "react-router-dom"
import { useAppDispatch } from "@/store/hooks"
import { logoutUser } from "@/store/slices/authSlice"

const { Header, Content, Sider } = Layout

export default function DashboardLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider breakpoint="lg" collapsedWidth="0">
        <div
          style={{
            height: 64,
            margin: 16,
            background: "rgba(255, 255, 255, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Admin
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={[
            {
              key: "dashboard",
              icon: <DashboardOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "profile",
              icon: <UserOutlined />,
              label: <Link to="/dashboard/profile">Profile</Link>,
            },
            {
              key: "settings",
              icon: <SettingOutlined />,
              label: <Link to="/dashboard/settings">Settings</Link>,
            },
          ]}
        />
      </Sider>

      {/* Layout chính */}
      <Layout>
        {/* Header */}
        <Header
          style={{
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>Dashboard</h2>
          <Button onClick={handleLogout} type="primary" icon={<LogoutOutlined />} danger>
            Logout
          </Button>
        </Header>

        {/* Nội dung */}
        <Content style={{ margin: "16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: 8,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
