import React, { FormEvent, useState } from "react";
import Layout from "./Layout";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Dropdown from "../components/Dropdown";
import Button from "../components/Button";
import axios from "axios";

type Props = {};

// interface ProductProps {}

const AddProduct = (props: Props) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: 0
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/product", formData);
      navigate("/products")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.response.data.msg);
    }
  };

  return (
    <Layout>
      <div className="flex items-center gap-x-5 mb-10">
        <button onClick={() => navigate("/products")}>
          <ArrowLeft />
        </button>
        <h2>Add Product</h2>
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
          id="price"
          label="Price"
          type="number"
          required
          onChange={(e) => {
            setFormData({
              ...formData,
              price: Number(e.target.value),
            });
          }}
        />
        <Button type="submit" variant="secondary">
          Add
        </Button>
      </form>
    </Layout>
  );
};

export default AddProduct;
