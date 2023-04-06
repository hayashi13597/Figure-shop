import React, { useState, useEffect } from "react";
import _ from "lodash";
import axios from "axios";
import RowItem from "./RowItem";
import { useDispatch } from "react-redux";
import { addToCart, removeItem } from "../Header/Cart/cartSlice";
import { useStore } from "react-redux";
import { persistStore } from "redux-persist";

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

const OrderItem = ({ props }: any) => {
  const { title, description, bannerImage, position, show } = props;

  const [data, setData] = useState < IData[] > ([]);
  const dispatch = useDispatch();
  const store = useStore();

  const handleAddToCartRedux = (cart: IData) => {
    dispatch(addToCart({cart, quantity:1}));
    persistStore(store).flush();
  };

  useEffect(() => {
    persistStore(store).flush();
  }, [store]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/products/"
      );
      setData(res.data.products);
    };
    fetchData();
  }, []);

  const chunkedData = _.chunk(data, 2);

  return (
    <div className="orders">
      <div className="orders-heading">
        <h2 className="htitle">
          <a href="">{title}</a>
        </h2>
        <p className="subTitle">{description}</p>
      </div>
      <div className="orders-content">
        <div className={`orders-content__banner ${position ? "order-2" : ""}`}>
          <a href="">
            <img src={bannerImage} />
          </a>
        </div>
        <div className="orders-content__products" id="product-orders">
          {chunkedData.slice(show[0], show[1]).map((data, index) => (
            <div className="product-row" key={index}>
              {data.map((item, index) => (
                <RowItem
                  props={item}
                  key={index}
                  onHanldAddCart={handleAddToCartRedux}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
