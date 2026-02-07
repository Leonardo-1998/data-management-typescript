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
import { Link } from "react-router";

export function Register() {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setRegisterForm((registerForm) => ({
      ...registerForm,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      await axios.post("http://localhost:3000/api/user/register", registerForm);
      console.log("Form data: ", registerForm);
    } catch (error) {
      setErrorMsg(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#EAF7CF]">
        <Card className="w-full max-w-sm ">
          <CardHeader>
            <CardTitle>Register new account</CardTitle>
            <CardDescription>
              Create your account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            {errorMsg && (
              <div className="mb-4 text-red-600 text-sm font-semibold">
                {errorMsg}
              </div>
            )}
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
