import React, { FormEvent, useEffect, useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, reset } from "../features/authSlice";
import { RootState } from "../store/store";

interface FormDataProps {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormDataProps>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, message, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/");
    }
    dispatch(reset());
  }, [dispatch, navigate, user, isSuccess]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email: formData.email, password: formData.password }));
  };

  return (
    <div className="min-h-screen flex flex-col place-content-center justify-center">
      <p className="text-red-500 text-center text-lg">{isError ? message : null}</p>
      <div className="w-[40%] mx-auto p-10 border rounded-md">
        <h2 className="text-center text-3xl mb-10">Login</h2>
        <form action="" onSubmit={handleSubmit} className="space-y-3">
          <InputField
            id="email"
            label="Email"
            placeholder="Your Email"
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />
          <InputField
            id="password"
            label="Password"
            placeholder="Your Password"
            type="password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />

          <div className="!mt-10">
            <Button type="submit">
              {isLoading ? "Loading.." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
