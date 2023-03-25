import { BsCart3 } from "react-icons/bs";

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

const RowItem: React.FC<{
  props: Data;
  onHanldAddCart: (value: Data) => void;
}> = ({ props, onHanldAddCart }) => {
  return (
    <div className="row-item">
      <div className="item-img">
        <a className="nothover" href="#">
          <img src={`/src/assets/images/${props.image[0]}`} alt="" />
        </a>
        <a className="whenhover" href="#">
          <img src={`/src/assets/images/${props.image[1]}`} alt="" />
        </a>
      </div>
      <div className="item-detail">
        <h3>
          <a href="" id="product-name">
            {props.name}
          </a>
        </h3>
        <p className="item-detail__price" id="product-price">
          {props.price}đ
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
