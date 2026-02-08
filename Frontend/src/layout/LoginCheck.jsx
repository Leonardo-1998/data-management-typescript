import { useEffect, useState } from "react";
import { useNavigate, Outlet, Link } from "react-router";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function LoginCheck() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState("");

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

    const getProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const name = response.data.data.name;
        const email = response.data.data.email;
        if (!name) {
          setProfile(email);
        } else {
          setProfile(name);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getProfile();
  }, []);

  return (
    <>
      <nav className="bg-[#4A7B9D] shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">
            <Link to="/home">Home</Link>
          </h1>
          <div className="text-white">
            Hello,
            <Link to="/profile">
              <Button variant="link" className="text-white">
                {profile}
              </Button>
            </Link>
            |
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
