import { BsCart3 } from "react-icons/bs";
import formatter from "../../utils/formatter";
import React from "react";
import { Link } from "react-router-dom";

interface Data {
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

const RowItem: React.FC<{
  props: Data;
  onHanldAddCart: (value: Data) => void;
}> = ({ props, onHanldAddCart }) => {
  return (
    <div className="row-item">
      <div className="item-img">
        <Link className="nothover" to={`/detail/${props._id}`}>
          <img src={props.image} />
        </Link>
        <Link className="whenhover" to={`/detail/${props._id}`}>
          <img src={props.image} />
        </Link>
      </div>
      <div className="item-detail">
        <h3>
          <Link to={`/detail/${props._id}`} id="product-name">
            {props.name}
          </Link>
        </h3>
        <p className="item-detail__price" id="product-price">
          {formatter.format(props.price)}đ
        </p>
      </div>
      <div className="item-action">
        <button
          className="item-action__btn"
          onClick={() => onHanldAddCart(props)}
        >
          <BsCart3 className="btn-cart" />
        </button>
      </div>
    </div>
  );
};

export default RowItem;
