import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { getMe } from '../features/authSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Button from '../components/Button';

type Props = {}

const Products = (props: Props) => {
  const dispatch = useDispatch()
  const [products, setProducts] = useState()

  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/product")
        console.log(res.data)
      } catch (error) {
        console.error(error)
      }
    }

    getProducts()
  }, [])

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  return (
    <Layout>
        <h1 className='text-4xl mb-3'>Products</h1>
        <Button>Add Product</Button>
    </Layout>
  )
}

export default Products