import { Routes, Route } from "react-router-dom";
import Register from "../pages/auth/Register";
import Layout from "../components/Layout/Layout";
import Login from "../pages/auth/Login";
import PersistedLayer from "../components/Layout/PersistedLayer";
import Profile from "../pages/profile/profile";
import Home from "../pages/home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PersistedLayer/>}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>} />
          <Route path="profile" element={<Profile/>}/>
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
