import Navbar from "@/components/Navbar"
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <div>
      <Navbar/>
      <main>
        Đây là MainLayout
        <Outlet /> {/* render page con */}
      </main>
    </div>
  )
}
