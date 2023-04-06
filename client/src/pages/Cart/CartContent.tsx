import React from 'react'
import { Link } from 'react-router-dom';
import formatter from '../../utils/formatter';
import './style.css'
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../components/Header/Cart/cartSlice';
import CartContentItem from './CartContentItem';

interface IData {
  _id: number;
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

const CartContent = () => {
  const cartItems = useSelector(selectCartItems);

  const total = cartItems.reduce((accumulator: number, item: IData) => {
    return accumulator + item.price * item.quantity;
  }, 0);

  return (
    <main className="main">
      <nav className="container flex py-2 bg-topBar mb-5" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3 md:w-4/5 mx-auto">
          <li className="inline-flex items-center">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              Trang chủ
            </Link>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="pointer-events-none">/</span>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                Giỏ hàng
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <section className="wrapper-mainCart w-4/5 mx-auto">
        <div className="heading-titleCart">
          <div className="container">
            <h1 className="heading-cart">Giỏ hàng của bạn</h1>
          </div>
        </div>
        <div className="content-bodyCart">
          <div className="container">
            <div className="row">
              <div className="contentCart-detail">
                <div className="list-pageform-cart">
                  <div className="cart-row">
                    {cartItems.length > 0 ? <>
                      <p className="title-number-cart">
                        Bạn đang có <strong className="count-cart">{cartItems.length}</strong> trong
                        giỏ hàng
                      </p>
                      <div className="table-cart">
                        {cartItems.map((item: IData) => (<CartContentItem props={item} key={item._id} />))}
                      </div>
                    </>
                      : (<div className="table-cart">
                        <p>Giỏ hàng của bạn đang trống</p>
                      </div>)}
                  </div>
                </div>
              </div>
              <div className="sidebarCart-sticky">
                <div className="wrap-order-summary">
                  <h2 className="summary-title">Thông tin đơn hàng</h2>
                  <div className="summary-total">
                    <p>
                      Tổng tiền
                      <span>{formatter.format(total)}đ</span>
                    </p>
                  </div>
                  <div className="summary-action">
                    <p>Phí vận chuyển sẽ được tính ở trang thanh toán.</p>
                    <p>Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.</p>
                    <Link to="/payment" className="checkout-btn btnred">
                      THANH TOÁN
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

  )
}

export default CartContent