import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

type Props = {};

interface UserProps {
  uuid: string;
  name: string;
  email: string;
  role: string;
}

const UserList = (props: Props) => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const thTheadClass = "text-left py-5 border-b border-b-slate-300";
  const thTbodyClass = "text-left font-normal py-2";
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setUsers(res.data);
    } catch (error) {
      setError(error as string);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.uuid !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-4xl mb-10">User</h1>

      <button
        className="bg-blue-500 px-5 py-2 rounded-md text-white font-semibold mb-5"
        onClick={() => navigate("add")}
      >
        Add user
      </button>
      <h2>List of Users</h2>
      <p>{error ? error : null}</p>

      <table className="w-full border border-slate-200 mt-3">
        <thead>
          <tr>
            <th className="text-center py-5 px-1 border-b border-b-slate-300">
              No
            </th>
            <th className={thTheadClass}>Name</th>
            <th className={thTheadClass}>Email</th>
            <th className={thTheadClass}>Role</th>
            <th className={thTheadClass}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, id) => (
            <tr key={user.uuid}>
              <th className="text-center font-normal py-2">{id + 1}</th>
              <th className={thTbodyClass}>{user.name}</th>
              <th className={thTbodyClass}>{user.email}</th>
              <th className={thTbodyClass}>{user.role}</th>
              <th className={thTbodyClass}>
                <div className="inline-flex items-center gap-x-2">
                  <Button variant="primary" onClick={() => navigate(`edit/${user.uuid}`)}>Edit</Button>
                  <Button
                    variant="secondary"
                    onClick={() => deleteUser(user.uuid)}
                  >
                    Delete
                  </Button>
                </div>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
