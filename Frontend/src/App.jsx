import { Public } from "./route/public";
import { Login } from "./route/login";
import { Register } from "./route/register";
import { Home } from "./route/home";
import { Routes, Route } from "react-router";
import { CreatePost } from "./route/createPost";

import Authlayout from "./layout/AuthLayout";
import LoginCheck from "./layout/LoginCheck";
import { EditPost } from "./route/editPost";
import { Profile } from "./route/profile";
import { EditProfile } from "./route/editProfile";
import { PublicDetails } from "./route/publicDetails";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Authlayout />}>
          <Route index element={<Public />} />
          <Route path="public/:id" element={<PublicDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<LoginCheck />}>
          <Route path="home" element={<Home />} />
          <Route path="post/create" element={<CreatePost />} />
          <Route path="post/edit/:id" element={<EditPost />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<EditProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
