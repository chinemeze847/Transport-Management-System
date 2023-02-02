import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout";
import AvaliableBuses from "./pages/users/AvaliableBuses";
import UserHome from "./pages/users/UserHome";
import SingleTrip from "./pages/users/SingleTrip";
import DriverHome from "./pages/drivers/DriverHome";
import NewTrip from "./pages/drivers/NewTrip";
import DriverSingleTrip from "./pages/drivers/DriverSingleTrip";
import AllDriversTrip from "./pages/drivers/AllDriversTrip";
import AllUsers from "./pages/admin/AllUsers";
import AllDrivers from "./pages/admin/AllDrivers";
import AllTrips from "./pages/admin/AllTrips";
import AdminSingleTrip from "./pages/admin/AdminSingleTrip";
import Dashboard from "./pages/admin/Dashboard";
import AdminSharedLayout from "./components/AdminSharedLayout";
import AddDriver from "./pages/admin/AddDriver";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<SharedLayout />}>
          <Route index element={<UserHome />} />
          <Route path="avialable" element={<AvaliableBuses />} />
          <Route path=":tripId" element={<SingleTrip />} />
          
        </Route>
        <Route path="/drivers" element={<SharedLayout />}>
          <Route index element={<DriverHome />} />
          <Route path="add-trip" element={<NewTrip />} />
          <Route path="all-trips" element={<AllDriversTrip />} />
          <Route path=":tripId" element={<DriverSingleTrip />} />
          
        </Route>
        <Route path="/admin" element={<AdminSharedLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<AllUsers />} />
          <Route path="drivers" element={<AllDrivers />} />
          <Route path="add-driver" element={<AddDriver />} />
          <Route path="trips" element={<AllTrips />} />
          <Route path="trips/:tripId" element={<AdminSingleTrip />} />
          
        </Route>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
