import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function UsersList() {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const user = await axios.get("http://localhost:3000/api/user/all");
        setUsersList(user.data.data);
        console.log(user.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="min-h-[calc(100vh-60px)] flex bg-[#EAF7CF] pt-10 flex-col items-center gap-5">
      <Link to="/">
        <Button variant="outline">Post List</Button>
      </Link>
      <Table className="w-2/5 mx-auto bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersList.map((user, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{user.userWithOutPassword.email}</TableCell>
                <TableCell>{user.userWithOutPassword.name}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
