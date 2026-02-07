import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MoreHorizontalIcon } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export function Home() {
  const [postData, setPostData] = useState([]);
  const [allPostData, setAllPostData] = useState([]);
  const [search, setSearch] = useState("");

  const getData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const post = await axios.get("http://localhost:3000/api/post/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPostData(post.data.data);
      setAllPostData(post.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/post/${id}`);

      getData();
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch Data
  useEffect(() => {
    getData();
  }, []);

  // Search
  useEffect(() => {
    const filteredData = allPostData.filter((data) => {
      if (data.title.includes(search)) {
        return data;
      }
    });

    setPostData(filteredData);
  }, [search]);

  return (
    <div className="min-h-[calc(100vh-60px)] flex bg-[#EAF7CF] pt-10 flex-col items-center">
      <Field className="mb-10 w-1/5">
        <Input
          className="bg-white"
          id="searchTitle"
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Field>
      <Table className="w-4/5 mx-auto bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {postData.map((post, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontalIcon />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/post/edit/${post.id}`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => handleDelete(post.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
