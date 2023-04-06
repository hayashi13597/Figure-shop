import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../components/Header/Cart/cartSlice';
import formatter from '../../utils/formatter';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch } from 'react-redux';
import { loadUser } from '../../slice/authSlice';
import { addOrder } from './paymentSlice';
import * as Toastify from '../../utils/toastify'
import { ToastContainer } from 'react-toastify';

interface IData {
  _id: string;
  categoryId: {
    name: string;
    _id: string;
  };
  image: string;
  name: string;
  price: number;
  createdAt: string;
  amount: number;
  quantity: number;
}

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState(15000)
  const cartItems = useSelector(selectCartItems);
  const total = cartItems.reduce((accumulator: number, item: IData) => {
    return accumulator + item.price * item.quantity;
  }, 0);
  const isAuthenticated = useSelector((state: any) => state.authLogin.isAuthenticated);
  const user = useSelector((state: any) => state.authLogin.user);
  const productId: string[] = [];

  cartItems.forEach((item: IData) => {
    productId.push(item._id);
  })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/register', { state: 'warning' })
    }
  }, [])

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  return (
    <>
      <ToastContainer />
      <div>
        <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
          <Link to="/" className="text-2xl font-bold text-gray-800">Firgure Shop</Link>
        </div>
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <div className="px-4 pt-8">
            <p className="text-xl font-medium">Giỏ hàng</p>
            <p className="text-gray-400">Kiểm tra và chọn phương thức giao hàng</p>
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              {cartItems.map((item: IData) => (<div className="flex flex-col rounded-lg bg-white sm:flex-row" key={item._id}>
                <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={item.image} />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">{item.name}</span>
                  <span className="float-right text-gray-400">Số lượng: {item.quantity}</span>
                  <p className="text-lg font-bold">Tổng: {formatter.format(item.price * item.quantity)}đ</p>
                </div>
              </div>))}
            </div>
            <p className="mt-8 text-lg font-medium">Phương thức giao hàng</p>
            <form className="mt-5 grid gap-6">
              <div className="relative" onClick={() => setDelivery(30000)}>
                <input className="peer hidden" id="radio_1" type="radio" name="radio" defaultChecked />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
                <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
                  <img className="w-14 object-contain" src="https://5.imimg.com/data5/TW/DF/GLADMIN-33279647/express-delivery-services-500x500.png" />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Nhanh</span>
                    <p className="text-slate-500 text-sm leading-6">Nhận hàng trong: 1-2 ngày</p>
                  </div>
                </label>
              </div>
              <div className="relative" onClick={() => setDelivery(15000)}>
                <input className="peer hidden" id="radio_2" type="radio" name="radio" defaultChecked />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
                <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_2">
                  <img className="w-14 object-contain" src="https://img.freepik.com/free-vector/delivery-service-illustrated_23-2148505081.jpg?w=2000" />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Tiết kiệm</span>
                    <p className="text-slate-500 text-sm leading-6">Nhận hàng trong: 3-6 ngày</p>
                  </div>
                </label>
              </div>
            </form>
          </div>
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Chi tiết thanh toán</p>
            <p className="text-gray-400">Hãy chọn phương thức thanh toán</p>
            <div>
              {/* Total */}
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Tạm tính</p>
                  <p className="font-semibold text-gray-900">{formatter.format(total)}đ</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Phí ship</p>
                  <p className="font-semibold text-gray-900">{formatter.format(delivery)}đ</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Tổng</p>
                <p className="text-2xl font-semibold text-gray-900">{formatter.format(total + delivery)}đ</p>
              </div>
            </div>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: ((total + delivery) / 23452).toFixed(2),
                      },
                      status: "PENDING",
                    },
                  ],
                });
              }}
              onApprove={(data, actions): any => {
                return actions.order?.capture().then((details) => {
                  dispatch(addOrder({
                    userId: user._id,
                    productId,
                    paypalPayment: details
                  })).then(() => Toastify.successNotify("Thanh toán thành công"));
                  setTimeout(() => window.location.href = '/', 2000)
                });
              }}
            />
            <div className="flex items-center justify-between">
              <Link to="/cart" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1 rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                Quay lại giỏ hàng
              </Link>
              <Link to="/" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Trang chủ
                <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Payment