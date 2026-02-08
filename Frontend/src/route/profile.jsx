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
import { Link } from "react-router";

export function Profile() {
  const [profile, setProfile] = useState({ email: "", name: "" });

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
          <Link to="/profile/edit">
            <Button className="w-full">Edit</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
