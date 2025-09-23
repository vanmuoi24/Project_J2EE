import { Route, BrowserRouter, Routes } from "react-router-dom"
import MainLayout from "@layouts/MainLayout"
import Home from "@pages/Home"
import About from "@pages/About"
import NotFound from "@pages/NotFound"
import DashboardLayout from "@/layouts/DashboardLayout"
import DashboardPage from "@/pages/Dashboard"
import ProfilePage from "@/pages/Profile"
import LoginPage from "@/pages/Auth/LoginPage"
import RegisterPage from "@/pages/Auth/RegisterPage"
import RouteGuard from "./RouteGuard"


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>

        <Route element={<RouteGuard isPrivate={false} />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<RouteGuard isPrivate/>}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}