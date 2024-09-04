import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getMe } from "../features/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../lib";

interface ProductProps {
  name: string;
  price: number;
  user: { name: string; email: string };
  uuid: string;
}

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [error, setError] = useState("");
  const thTheadClass = "text-left py-5 border-b border-b-slate-300";
  const thTbodyClass = "text-left font-normal py-2";

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/product");
        setProducts(res.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.responsea.data.msg);
      }
    };

    getProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/product/${id}`);
      setProducts((prevProduct) =>
        prevProduct.filter((product) => product.uuid !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  return (
    <Layout>
      <h1 className="text-4xl mb-10">Products</h1>
      <Button onClick={() => navigate("/products/add")}>Add Product</Button>
      <h2 className="mt-4">List of Products</h2>

      <table className="w-full border border-slate-200 mt-3">
        <thead>
          <tr>
            <th className="text-center py-5 px-1 border-b border-b-slate-300">
              No
            </th>
            <th className={thTheadClass}>User</th>
            <th className={thTheadClass}>Product</th>
            <th className={thTheadClass}>Price</th>
            <th className={thTheadClass}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {error ? (
            <p>{error}</p>
          ) : (
            products?.map((product, id) => (
              <tr key={product.uuid}>
                <th className="text-center font-normal py-2">{id + 1}</th>
                <th className={thTbodyClass}>{product.user.name}</th>
                <th className={thTbodyClass}>{product.name}</th>
                <th className={thTbodyClass}>{formatCurrency(product.price)}</th>
                <th className={thTbodyClass}>
                  <div className="inline-flex items-center gap-x-2">
                    <Button
                      variant="primary"
                      onClick={() => navigate(`edit/${product.uuid}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => deleteProduct(product.uuid)}
                    >
                      Delete
                    </Button>
                  </div>
                </th>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Layout>
  );
};

export default Products;
