import React, { useEffect } from "react";
import Layout from "./Layout";
import { useDispatch } from "react-redux";
import { getMe } from "../features/authSlice";
import UserList from "../components/UserList";

const User = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Layout>
      <UserList />
    </Layout>
  );
};

export default User;
