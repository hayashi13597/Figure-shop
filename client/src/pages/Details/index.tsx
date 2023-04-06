import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import DetailItem from './DetailItem'
import './style.css'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'

const Details = () => {
  const location = useLocation();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const id = location.pathname.split('/').pop();
    const getData = async () => {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      setItem(res.data.product);
    }
    getData();
  }, [])

  return (
    <>
      <ToastContainer />
      <Header />
      {item && <DetailItem props={item} />}
      <Footer />
    </>
  )
}

export default Details