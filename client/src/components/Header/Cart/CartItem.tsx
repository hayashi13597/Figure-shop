import React from "react";

interface IData {
  id: number;
  category: string;
  image: string[];
  name: string;
  price: number;
  createdAt: string;
  amount: number;
  quantity: number;
}

const CartItem: React.FC<{ props: IData }> = ({ props }) => {
  const { id, image, name, price, quantity } = props;
  return (
    <tr className="mini-cart__item">
      <td className="mini-cart__left">
        <a href="#">
          <img src={`/src/assets/images/${image[0]}`} />
        </a>
      </td>
      <td className="mini-cart__right">
        <p className="mini-cart__title">
          <a href="#">{name}</a>
        </p>
        <div className="mini-cart__quantity">
          <span className="mnc-value">{quantity}</span>
        </div>
        <div className="mini-cart__price">
          <span className="mnc-price">{price}đ</span>
        </div>
        <div className="mini-cart__remove">
          <a href="#">
            <i className="fa-solid fa-xmark"></i>
          </a>
        </div>
      </td>
    </tr>
  );
};

export default CartItem;
