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
import { Link, useParams } from "react-router";

export function PublicDetails() {
  const { id } = useParams();
  const [publicDetails, setPublicDetails] = useState({
    title: "",
    content: "",
    author: "",
    email: "",
  });

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/post/${id}`,
        );

        console.log(response);

        const title = response.data.title;
        const content = response.data.content;
        const name = response.data.author.name;
        const email = response.data.author.email;
        setPublicDetails({
          title: title,
          content: content,
          name: name,
          email: email,
        });
      } catch (error) {
        console.error(error);
      }
    };

    getDetails();
  }, []);

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-[#EAF7CF]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Title : {publicDetails.title}</Label>
            </div>
            <div className="grid gap-2">
              <Label>Content : {publicDetails.content}</Label>
            </div>
            <div className="grid gap-2">
              <Label>Author Name : {publicDetails.name || "-"}</Label>
            </div>
            <div className="grid gap-2">
              <Label>Author Email : {publicDetails.email}</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Link to="/">
            <Button className="w-full">Back</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
