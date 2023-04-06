import React from 'react';
import { Link } from 'react-router-dom';

interface IData {
  _id: number;
  category: string;
  image: string;
  name: string;
  price: number;
  createdAt: string;
  quantity: number;
}

const ColItem: React.FC<{ props: IData }> = ({ props }) => {
  return (
    <div className="col-item">
      <div className="col-item__img">
        <Link className="nothover" to={`/detail/${props._id}`}>
          <img src={props.image} alt="" />
        </Link>
        <Link className="whenhover" to={`/detail/${props._id}`}>
          <img src={props.image} alt="" />
        </Link>
      </div>
      <div className="col-item__detail">
        <h3>
          <Link to={`/detail/${props._id}`}>{props.name}</Link>
        </h3>
        <p className="item-detail__price">{Intl.NumberFormat('en-US').format(props.price)}đ</p>
      </div>
    </div>
  );
};

export default ColItem;
