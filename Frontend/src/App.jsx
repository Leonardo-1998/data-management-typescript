import { Public } from "./route/public";
import { Login } from "@/route/login";
import { Register } from "./route/register";
// import { Home } from "./route/home";
import { Routes, Route } from "react-router";
import Authlayout from "./layout/AuthLayout";
import LoginCheck from "./layout/LoginCheck";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Authlayout />}>
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        {/* <Route element={<LoginCheck />}> */}
        {/* <Route path="home" element={<Home />} /> */}
        {/* </Route> */}
      </Routes>
    </>
  );
}

export default App;
