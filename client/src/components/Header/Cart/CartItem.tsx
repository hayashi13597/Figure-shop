import React from "react";
import formatter from "../../../utils/formatter";
import { AiOutlineClose } from "react-icons/ai";
import { removeItem } from "./cartSlice";
import { useDispatch } from "react-redux";

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

  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(removeItem(props));
  };

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
          <span className="mnc-price">{formatter.format(price)}đ</span>
        </div>
        <div
          className="mini-cart__remove cursor-pointer"
          onClick={handleRemoveItem}
        >
          <AiOutlineClose />
        </div>
      </td>
    </tr>
  );
};

export default CartItem;
