import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import bxCart from "../../../assets/images/bx-cart.svg";
import CartItem from "./CartItem";
import { selectCartItems } from "./cartSlice";
import { useSelector } from "react-redux";
import formatter from "../../../utils/formatter";

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

const Cart: React.FC<{ showCart: boolean; handleShowCart: () => void }> = ({
  showCart,
  handleShowCart,
}) => {
  const cartItems: IData[] = useSelector(selectCartItems);

  const total = cartItems.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);

  return (
    <div className={`header__cart ${showCart ? "js-action-show" : ""}`}>
      <div className="header__cart--text" onClick={handleShowCart}>
        <div className="cart__icon">
          <img src={bxCart} />
          <span className="cart__number">{cartItems.length}</span>
        </div>
        <div className="cart__text">Giỏ hàng</div>
      </div>
      <div className="cart-dropdown">
        <span className="box-triangle"></span>
        <div className="cart-dropdown__content">
          <p className="box-title">Giỏ hàng</p>
          <div className="cart-view clearfix">
            <div className="cart-view-scroll">
              <table>
                <tbody id="mini-cart">
                  {cartItems.length > 0 ? (
                    cartItems.map((item: IData) => (
                      <CartItem props={item} key={item._id} />
                    ))
                  ) : (
                    <tr className="mini-cart__empty">
                      <td>
                        <div className="svgico-mini-cart">
                          <svg
                            width="81"
                            height="70"
                            viewBox="0 0 32 32"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                          >
                            <g id="icomoon-ignore"></g>
                            <path
                              d="M30.622 9.602h-22.407l-1.809-7.464h-5.027v1.066h4.188l5.198 21.443c-1.108 0.323-1.923 1.334-1.923 2.547 0 1.472 1.193 2.666 2.666 2.666s2.666-1.194 2.666-2.666c0-0.603-0.208-1.153-0.545-1.599h7.487c-0.337 0.446-0.545 0.997-0.545 1.599 0 1.472 1.193 2.666 2.665 2.666s2.666-1.194 2.666-2.666c0-1.473-1.193-2.665-2.666-2.666v0h-11.403l-0.517-2.133h14.968l4.337-12.795zM13.107 27.196c0 0.882-0.717 1.599-1.599 1.599s-1.599-0.717-1.599-1.599c0-0.882 0.717-1.599 1.599-1.599s1.599 0.718 1.599 1.599zM24.836 27.196c0 0.882-0.718 1.599-1.6 1.599s-1.599-0.717-1.599-1.599c0-0.882 0.717-1.599 1.599-1.599 0.882 0 1.6 0.718 1.6 1.599zM11.058 21.331l-2.585-10.662h20.662l-3.615 10.662h-14.462z"
                              fill="#000000"
                            ></path>
                          </svg>
                        </div>
                        Hiện chưa có sản phẩm
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="cart-view-line"></div>
            <div className="cart-view-total">
              <table>
                <tbody>
                  <tr>
                    <td className="mnc-total text-left">TỔNG TIỀN:</td>
                    <td className="mnc-total text-right" id="total-view-cart">
                      {formatter.format(total)}đ
                    </td>
                  </tr>
                  <tr className="mini-cart__button">
                    <td>
                      <Link to="/cart" className="linktocart button">
                        Xem giỏ hàng
                      </Link>
                    </td>
                    <td>
                      <Link
                        to="/payment"
                        className="linktocheckout button btnred"
                      >
                        Thanh toán
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
