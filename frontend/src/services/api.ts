/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "./instance";

interface FormDataProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const extractErrorMessage = (error: any): string => {
  return error.response.data?.msg || "An error occurred";
};

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const createUser = async (formData: FormDataProps) => {
  try {
    return await axiosInstance.post("/users", formData);
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
