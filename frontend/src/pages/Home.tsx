import React, { useEffect } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getMe } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

type Props = {};

const Home = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);
  return (
    <>
      {isError ? (
        <p>{message}</p>
      ) : (
        <Layout>
          <h2 className="text-2xl font-semibold">Welcome, {user?.name}</h2>
        </Layout>
      )}
    </>
  );
};

export default Home;
