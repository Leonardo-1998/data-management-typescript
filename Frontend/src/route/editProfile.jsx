import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

export function EditProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: "" });

  const handleSubmit = async (e) => {
    e.preventDefault;
    try {
      const token = localStorage.getItem("access_token");
      const profile2 = await axios.put(
        "http://localhost:3000/api/user/update",
        profile,
        {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "application/json",
        },
      );
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile((profile) => ({
      ...profile,
      [id]: value,
    }));
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
                <Label htmlFor="name">Name :</Label>
                <Input
                  id="name"
                  type="name"
                  required
                  value={profile.name}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-row gap-2">
          <Button className="flex-1" onClick={handleSubmit}>
            Edit
          </Button>
          <Link to="/profile">
            <Button className="flex-1">Cancel</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
