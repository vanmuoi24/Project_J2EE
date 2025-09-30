import Navbar from "@/components/Share/Navbar"
import TopNavbar from "@/components/Share/TopNavbar"
import { Layout } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout"
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <Layout >
        <Header style={{backgroundColor: '#fff', padding: 0, height: 100}} >
            <TopNavbar />
            <Navbar/>
        </Header>
      <Content >
        <Outlet />
      </Content>
      <Footer >
         PhathociT Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  )
}
