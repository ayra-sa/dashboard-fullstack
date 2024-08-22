import { ArrowLeft } from "lucide-react";
import React, { FormEvent, useEffect, useState } from "react";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { createUser } from "../services/api";
import { getMe } from "../features/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import Dropdown from "../components/Dropdown";

type Props = {};

const AddUser = (props: Props) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", formData);
      navigate("/users")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      // setError(error.response.data.msg);
    }
  };

  return (
    <Layout>
      <div className="flex items-center gap-x-5 mb-10">
        <button onClick={() => navigate("/users")}>
          <ArrowLeft />
        </button>
        <h2>Add User</h2>
      </div>
      {error && error}
      <form action="" className="space-y-3" onSubmit={handleSubmit}>
        <InputField
          id="name"
          label="Name"
          type="text"
          required
          onChange={(e) => {
            setFormData({
              ...formData,
              name: e.target.value,
            });
          }}
        />
        <InputField
          id="email"
          label="Email"
          type="email"
          required
          onChange={(e) => {
            setFormData({
              ...formData,
              email: e.target.value,
            });
          }}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          required
          onChange={(e) => {
            setFormData({
              ...formData,
              password: e.target.value,
            });
          }}
        />
        <InputField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          required
          onChange={(e) => {
            setFormData({
              ...formData,
              confirmPassword: e.target.value,
            });
          }}
        />
        <Dropdown
          id="role"
          label="Role"
          options={options}
          onChange={(e) => {
            setFormData({
              ...formData,
              role: e.target.value,
            });
          }}
          value={formData.role}
        />
        <Button type="submit" variant="secondary">
          Add
        </Button>
      </form>
    </Layout>
  );
};

export default AddUser;
