import { useEffect } from "react";
import { useNavigate, Outlet, Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function LoginCheck() {
  const navigate = useNavigate();

  const handleLogOut = (e) => {
    e.preventDefault;

    localStorage.removeItem("access_token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <nav className="bg-[#4A7B9D] shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">
            <Link to="/home">Home</Link>
          </h1>
          <div>
            <Button
              variant="link"
              className="text-white"
              onClick={(e) => handleLogOut(e)}
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}
