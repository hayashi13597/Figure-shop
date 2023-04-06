import React from 'react';
import { Link } from "react-router-dom";
import formatter from '../../../utils/formatter';
interface searchResult {
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

const SearchItem: React.FC<{ searchResult: searchResult }> = ({ searchResult }) => {
  const { name, price, image } = searchResult;

  return (
    <div className="search-result">
      <div className="search-result__text">
        <Link to="/">{name}</Link>
        <span>{formatter.format(price)}đ</span>
      </div>
      <div className="search-result__img">
        <img src={image} />
      </div>
    </div>
  );
};

export default SearchItem;
