import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useDispatch } from "react-redux";
import { getMe } from "../features/authSlice";
import UserList from "../components/UserList";

type Props = {};

const User = (props: Props) => {
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
