import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function Public() {
  const [postData, setPostData] = useState([]);
  const [allPostData, setAllPostData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const post = await axios.get("http://localhost:3000/api/post/public");

        const postArr = post.data.data;
        const alteredPostArr = postArr.map((post) => {
          let { content, ...alteredPost } = post;
          if (content.length >= 10) {
            content = content.substring(0, 10) + "...";

            const newPost = { content, ...alteredPost };

            return newPost;
          } else {
            return post;
          }
        });

        setPostData(alteredPostArr);
        setAllPostData(alteredPostArr);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const filteredData = allPostData.filter((data) => {
      if (data.title.includes(search)) {
        return data;
      }
    });

    setPostData(filteredData);
  }, [search]);

  return (
    <div className="min-h-[calc(100vh-60px)] flex bg-[#EAF7CF] pt-10 flex-col items-center gap-5">
      <Field className="w-1/5">
        <Input
          className="bg-white"
          id="searchTitle"
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Field>

      <Link to="/users/list">
        <Button variant="outline">User List</Button>
      </Link>

      <Table className="w-4/5 mx-auto bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {postData.map((post, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.content}</TableCell>
                <TableCell className="text-center">
                  <Link to={`public/${post.id}`}>
                    <Button variant="outline">Details</Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
