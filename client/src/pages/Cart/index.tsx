import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CartContent from './CartContent'
import { ToastContainer } from 'react-toastify'

const Cart = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <CartContent />
      <Footer />
    </>
  )
}

export default Cart