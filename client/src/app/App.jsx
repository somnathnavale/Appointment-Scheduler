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

function App() {
  return (
    <Routes>
      <Route path="/" element={<PersistedLayer/>}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>} />
          <Route element={<AuthLayout/>}>
            <Route path="profile" element={<Profile/>}/>
            <Route path="schedule" element={<Schedule/>}/>
            <Route path="appointments" element={<MyAppointments/>}/>
          </Route>
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
