import React, { FormEvent, useEffect, useState } from "react";
import Layout from "./Layout";
import Dropdown from "../components/Dropdown";
import InputField from "../components/InputField";
import { getMe } from "../features/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const dispatch = useDispatch();
  const options = [
    {
      value: "admin",
      name: "admin",
    },
    {
      value: "user",
      name: "user",
    },
  ];

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const getUserById = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/users/${id}`);
      setName(res.data.name)
      setEmail(res.data.email)
      setRole(res.data.role)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserById();
  }, [id]);

  const updateUser = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        name,
        email,
        password,
        confirmPassword,
        role
      });
      navigate("/users");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      // setError(error.response.data.msg);
    }
  };
  return (
    <Layout>
      <h2>Edit User</h2>
      <form action="" className="space-y-3" onSubmit={updateUser}>
        <InputField
          id="name"
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Dropdown
          id="role"
          label="Role"
          options={options}
          onChange={(e) => setRole(e.target.value)}
          value={role}
        />
        <Button type="submit" variant="secondary">
          Edit
        </Button>
      </form>
    </Layout>
  );
};

export default EditUser;
