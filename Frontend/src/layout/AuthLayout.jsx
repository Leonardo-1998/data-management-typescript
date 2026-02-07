import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";

export default function Authlayout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    console.log("Masuk ke sini ===============");
    console.log(token);
    if (token) {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}
