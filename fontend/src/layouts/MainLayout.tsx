import Navbar from "@/components/Home/Navbar"
import TopNavbar from "@/components/Home/TopNavbar"
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <div>
      <TopNavbar />
      <Navbar/>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
