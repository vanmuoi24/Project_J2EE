import Navbar from "@/components/Share/Navbar"
import TopNavbar from "@/components/Share/TopNavbar"
import { Layout } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout"
import { Outlet } from "react-router-dom"
import {Footer as MyFooter }from '@/components/Share/Footer'

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
      <Footer  style={{padding: 0}}>
        <MyFooter/>
      </Footer>
    </Layout>
  )
}
