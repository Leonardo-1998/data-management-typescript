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
import { useState } from "react";
import { Link } from "react-router";

export function Login() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginForm((loginForm) => ({
      ...loginForm,
      [id]: value,
    }));
    console.log(loginForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault;
    console.log("Form data: ", loginForm);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#EAF7CF]">
        <Card className="w-full max-w-sm ">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={loginForm.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={loginForm.password}
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
            <Link to="/register" className="hover:underline">
              <Label>Don't have an account?</Label>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
