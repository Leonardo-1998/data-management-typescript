import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import React from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";

export function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ email: "", name: "" });

  const handleDelete = async () => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.delete("http://localhost:3000/api/user/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.removeItem("access_token");

      toast.error("Account Deleted Successfuly", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem("access_token");
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
        setProfile({ email: email, name: name });
      } catch (error) {
        console.error(error);
      }
    };

    getProfile();
  }, []);

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-[#EAF7CF]">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Email : {profile.email}</Label>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name : {profile.name}</Label>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Link to="/profile/edit" className="w-full">
            <Button className="w-full">Edit</Button>
          </Link>
          <Button
            variant="destructive"
            className="w-full mt-2"
            onClick={handleDelete}
          >
            Delete Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
