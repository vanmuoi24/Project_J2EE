import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "../pages/Admin/LayoutAdmin";
import ManagerUser from "../components/Admin/ManagerUser/ManagerUser";
import ManagerTour from "../components/Admin/ManagerTour/ManagerTour";
import ManagerBooking from "../components/Admin/ManagerBooking/ManagerBooking";
import ManagerPromotion from "../components/Admin/ManagerPomt/ManagerPomt";
import ManagerSchedule from "../components/Admin/ManagerTour/ManagerSchedule";
import ManagerDestination from "../components/Admin/ManagerTour/ManagerDestination";

const RouterApp = () => {
  return (
    <Routes>
      <Route path="/admin" element={<LayoutAdmin />}>
        <Route path="/admin/managerUser" element={<ManagerUser />} />
        <Route path="/admin/managerTour/list" element={<ManagerTour />} />
        <Route path="/admin/managerBooking" element={<ManagerBooking />} />
        <Route path="/admin/managerPromotion" element={<ManagerPromotion />} />
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
  );
};

export default RouterApp;
