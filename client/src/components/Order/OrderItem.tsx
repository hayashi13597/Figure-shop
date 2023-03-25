import { useState, useEffect } from "react";
import _ from "lodash";
import axios from "axios";
import RowItem from "./RowItem";

interface Data {
  id: number;
  category: string;
  image: string[];
  name: string;
  price: number;
  createdAt: string;
  amount: number;
  quantity: number;
}

const OrderItem = ({ props }: any) => {
  const { title, description, bannerImage, position, show } = props;
  const [data, setData] = useState<Data[]>([]);
  const [itemCart, setItemCart] = useState<Data[]>([]);

  useEffect(() => {
    const localStorageItem = JSON.parse(
      localStorage.getItem("cart") || "[]"
    ) as Data[];
    setItemCart(localStorageItem);
  }, []);

  const handleAddToCart = (cart: Data) => {
    const existingItem = itemCart.find((item) => item.id === cart.id);
    if (existingItem) {
      const updatedCart = itemCart.map((cartItem) => {
        if (cartItem.id === cart.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        }
        return cartItem;
      });
      setItemCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...itemCart, cart];
      setItemCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:5173/src/assets/json/data.json"
      );
      setData(res.data);
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
              {data.map((item) => (
                <RowItem
                  props={item}
                  key={item.id}
                  onHanldAddCart={handleAddToCart}
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
