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
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";

export function CreatePost() {
  const navigate = useNavigate();
  const [postForm, setPostForm] = useState({ title: "", content: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPostForm((postForm) => ({
      ...postForm,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault;

    try {
      const token = localStorage.getItem("access_token");
      await axios.post("http://localhost:3000/api/post/create", postForm, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Create new post successfully", {
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

      navigate("/home");
    } catch (error) {
      const errorMessage = error.response.data.message;
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
      console.error(error);
    }
  };

  return (
    <>
      <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-[#EAF7CF]">
        <Card className="w-full max-w-sm ">
          <CardHeader>
            <CardTitle>Create a new post</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title*</Label>
                  <Input
                    id="title"
                    type="title"
                    placeholder="Enter title"
                    value={postForm.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="content">Content</Label>
                  </div>
                  <Input
                    id="content"
                    type="content"
                    placeholder="Enter content"
                    required
                    value={postForm.content}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-row gap-2">
            <Button type="submit" className="flex-1" onClick={handleSubmit}>
              Create
            </Button>
            <Link to="/home" className="flex-1">
              <Button className="w-full">Cancel</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
