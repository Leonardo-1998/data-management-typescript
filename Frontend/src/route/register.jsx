import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";

export function Register() {
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setRegisterForm((registerForm) => ({
      ...registerForm,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/user/register", registerForm);

      toast.success("Register successful", {
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

      navigate("/login");
    } catch (error) {
      const errorMessage = error.response.data.message;
      if (error.response.status === 409) {
        toast.error(errorMessage, {
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
      } else if (error.response.status === 400) {
        errorMessage.map((err) => {
          return toast.error(err, {
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
        });
      }
      console.error(error);
    }
  };

  return (
    <>
      <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-[#EAF7CF]">
        <Card className="w-full max-w-sm ">
          <CardHeader>
            <CardTitle>Register new account</CardTitle>
            <CardDescription>
              Create your account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={registerForm.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={registerForm.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password*</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={registerForm.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Login
            </Button>
            <Link to="/login" className="hover:underline">
              <Label>Already have an account?</Label>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
