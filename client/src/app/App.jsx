import { Routes, Route } from "react-router-dom";
import Register from "../pages/auth/Register";
import Layout from "../components/Layout/Layout";
import Login from "../pages/auth/Login";
import PersistedLayer from "../components/Layout/PersistedLayer";
import Profile from "../pages/profile/Profile.jsx";
import Home from "../pages/home/Home";
import Schedule from "../pages/schedule/Schedule";
import AuthLayout from "../components/Layout/AuthLayout";
import MyAppointments from "../pages/appointment/MyAppointments.jsx";
import { AppRoutes } from "../constants/routes.js";

function App() {
  return (
    <Routes>
      <Route path={AppRoutes.HOME} element={<PersistedLayer />}>
        <Route path={AppRoutes.LOGIN} element={<Login />} />
        <Route path={AppRoutes.REGISTER} element={<Register />} />
        <Route path={AppRoutes.LAYOUT} element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<AuthLayout />}>
            <Route path={AppRoutes.PROFILE} element={<Profile />} />
            <Route path={AppRoutes.SCHEDULE} element={<Schedule />} />
            <Route path={AppRoutes.APPOINTMENTS} element={<MyAppointments />} />
          </Route>
          <Route path={AppRoutes.NOT_FOUND} element={<div>Not Found</div>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
