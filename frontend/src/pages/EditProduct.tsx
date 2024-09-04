import React, { FormEvent, useEffect, useState } from 'react'
import Layout from './Layout'
import InputField from '../components/InputField'
import Button from '../components/Button'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { getMe } from '../features/authSlice'
import { useDispatch } from 'react-redux'


const EditProduct = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [error, setError] = useState("")
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getProductDetail = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/product/${id}`)
      setName(res.data.name)
      setPrice(res.data.price)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getProductDetail()
  }, [])

  const updateProduct = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await axios.patch(`http://localhost:5000/product/${id}`, {
        name,
        price
      })
      navigate("/products")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.response.data.msg)
    }
  }

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Layout>
      <h2 className='mb-7 text-xl'>Edit Product</h2>
      {error && error}
      <form action="" className="space-y-3 last:mt-7" onSubmit={updateProduct}>
        <InputField
          id="name"
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          id="price"
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <Button type="submit" variant="secondary">
          Edit
        </Button>
      </form>
    </Layout>
  )
}

export default EditProduct