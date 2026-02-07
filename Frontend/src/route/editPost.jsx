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
import { Link, useNavigate, useParams } from "react-router";

export function EditPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [postForm, setPostForm] = useState({ title: "", content: "" });
  const [errorMsg, setErrorMsg] = useState([]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPostForm((postForm) => ({
      ...postForm,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault;
    setErrorMsg([]);

    try {
      const token = localStorage.getItem("access_token");
      await axios.put(`http://localhost:3000/api/post/${id}`, postForm, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      navigate("/home");
    } catch (error) {
      console.log(error.response);
      setErrorMsg(error.response.data.message);
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const getPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/post/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setPostForm({
          title: response.data.title,
          content: response.data.content,
        });
      } catch (error) {
        console.error(error);
      }
    };

    getPost();
  }, []);

  return (
    <>
      <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-[#EAF7CF]">
        <Card className="w-full max-w-sm ">
          <CardHeader>
            <CardTitle>Edit post</CardTitle>
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
              Edit
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
