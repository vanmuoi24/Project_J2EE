import { Route, BrowserRouter, Routes } from "react-router-dom";
import MainLayout from "@layouts/MainLayout";
import Home from "@pages/Home/page";
import About from "@pages/About";
import NotFound from "@pages/NotFound";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardPage from "@/pages/Dashboard";
import ProfilePage from "@/pages/Profile";
import LoginPage from "@/pages/Auth/LoginPage";
import RegisterPage from "@/pages/Auth/RegisterPage";
import Tours from "@/pages/Tours/page";
import RouteGuard from "./RouteGuard";
import LayoutAdmin from "../pages/Admin/LayoutAdmin";
import ManagerUser from "../components/Admin/ManagerUser/ManagerUser";
import ManagerTour from "../components/Admin/ManagerTour/ManagerTour";
import ManagerBooking from "../components/Admin/ManagerBooking/ManagerBooking";
import ManagerPromotion from "../components/Admin/ManagerPomt/ManagerPomt";
import ManagerSchedule from "../components/Admin/ManagerTour/ManagerSchedule";
import ManagerDestination from "../components/Admin/ManagerTour/ManagerDestination";
import TourDetail from "@/layouts/TourDetail";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/tours/*" element={<Tours />} />
          <Route path="/detail/:id" element={<TourDetail />}/>
          <Route element={<RouteGuard isPrivate />}>
            <Route path="/profile" element={<ProfilePage />}/>
          </Route>
        </Route>

        <Route element={<RouteGuard isPrivate={false} />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<RouteGuard isPrivate />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />

        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="/admin/managerUser" element={<ManagerUser />} />
          <Route path="/admin/managerTour/list" element={<ManagerTour />} />
          <Route path="/admin/managerBooking" element={<ManagerBooking />} />
          <Route
            path="/admin/managerPromotion"
            element={<ManagerPromotion />}
          />
          <Route
            path="/admin/managerTour/itinerary"
            element={<ManagerSchedule />}
          />
          <Route
            path="/admin/managerTour/destination"
            element={<ManagerDestination />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
