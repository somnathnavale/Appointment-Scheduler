import { Routes,Route } from "react-router-dom";
import Register from "../pages/auth/Register";
import Layout from "../components/Layout/Layout";
import Login from "../pages/auth/Login";

function App() {  
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path="/" element={<Layout/>}>
        <Route index element={<div>Home</div>}/>
        <Route path="*" element={<div>Not Found</div>}/>
      </Route>
    </Routes>
  )
}

export default App;
