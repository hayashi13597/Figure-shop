import { useState, useEffect } from "react";
import _ from "lodash";
import axios from "axios";
import RowItem from "./RowItem";
import { useDispatch } from "react-redux";
import { addToCart, removeItem } from "../Header/Cart/cartSlice";
import { useStore } from "react-redux";
import { persistStore } from "redux-persist";

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
  const dispatch = useDispatch();
  const store = useStore();

  const handleAddToCartRedux = (cart: Data) => {
    dispatch(addToCart(cart));
    persistStore(store).flush();
  };

  useEffect(() => {
    persistStore(store).flush();
  }, [store]);

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
