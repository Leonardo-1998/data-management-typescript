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

export function Login() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsgArr, setErrorMsgArr] = useState([]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginForm((loginForm) => ({
      ...loginForm,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault;
    setErrorMsg("");

    try {
      const login = await axios.post(
        "http://localhost:3000/api/user/login",
        loginForm,
      );

      console.log(login);
      const token = login.data.data.token;

      localStorage.setItem("access_token", token);
      navigate("/home");
    } catch (error) {
      const errorMessage = error.response.data.message;
      if (error.response.data.error === "False email or password") {
        setErrorMsg(errorMessage);
      } else if (error.response.data.error === "Bad Request") {
        setErrorMsgArr(errorMessage);
      }
      console.error(error);
    }
  };

  return (
    <>
      <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-[#EAF7CF]">
        <Card className="w-full max-w-sm ">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {errorMsg && (
              <div className="mb-4 text-red-600 text-sm font-semibold">
                {errorMsg}
              </div>
            )}
            {errorMsgArr && (
              <div className="mb-4 text-red-600 text-sm font-semibold">
                <ul>
                  {errorMsgArr.map((msg, idx) => {
                    return <li key={idx}>{msg}</li>;
                  })}
                </ul>
              </div>
            )}
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
