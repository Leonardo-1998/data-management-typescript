import { useEffect } from "react";
import { useNavigate, Outlet, Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function Authlayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <nav className="bg-[#4A7B9D] shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">
            <Link to="/">Home</Link>
          </h1>
          <div>
            <Button variant="link" className="text-white">
              <Link to="/login">Login</Link>
            </Button>
            |
            <Button variant="link" className="text-white">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}
