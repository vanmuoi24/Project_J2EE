<<<<<<< HEAD
import Navbar from "@/components/Navbar"
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <div>
      <Navbar/>
      <main>
        Đây là MainLayout
        <Outlet /> {/* render page con */}
=======
import Navbar from "@/components/Share/Navbar/Navbar"
import SubNavbar from "@/components/Share/SubNavbar"
  import { Outlet } from "react-router-dom"
import {Footer as MyFooter }from '@/components/Share/Footer'

export default function MainLayout() {
  return (
    <>
        <header>
            <SubNavbar />
            <Navbar/>
        </header>
      <main >
        <Outlet />
>>>>>>> 01a2cac
      </main>
      <footer>
        <MyFooter/>
      </footer>
    </>
  )
}
