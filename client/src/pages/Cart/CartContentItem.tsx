import React, { useState, useEffect } from 'react'
import formatter from '../../utils/formatter';
import { Link } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useDispatch, useStore } from 'react-redux';
import { removeItem, incrementQuantity, decrementQuantity } from '../../components/Header/Cart/cartSlice';
import { persistStore } from 'redux-persist';

const CartContentItem = ({ props }) => {
  const [quantity, setQuantity] = useState(props.quantity ?? 1);
  const dispatch = useDispatch();
  const store = useStore();

  const handleRemoveItem = () => {
    dispatch(removeItem(props));
  };
  const handlePlus = () => {
    dispatch(incrementQuantity(props));
    persistStore(store).flush();
  }
  const handleMinus = () => {
    dispatch(decrementQuantity(props));
    persistStore(store).flush();
  }
  useEffect(() => {
    persistStore(store).flush();
  }, [store]);

  return (
    <div className="media-line-item">
      <div className="media-left">
        <div className="item-imm">
          <Link to={`/detail/${props._id}`}>
            <img src={props.image} />
          </Link>
        </div>
      </div>
      <div className="media-right">
        <div className="item-info">
          <Link to={`/detail/${props._id}`}>
            <h3 className="item--title">
              {props.name}
            </h3>
          </Link>
        </div>
        <div className="item-qty">
          <div className="quantity-partent clearfix">
            <button type="button" className="qtyminus qty-btn" onClick={() => {
              setQuantity(Math.max(quantity - 1, 1));
              handleMinus();
            }}>
              -
            </button>
            <input type="text" min={1} className="item-quantity" value={quantity} onChange={() => setQuantity(quantity)} disabled />
            <button type="button" className="qtyplus qty-btn" onClick={() => {
              setQuantity(quantity + 1);
              handlePlus();
            }}>
              +
            </button>
          </div>
        </div>
        <div className="item-price">
          <p>
            <span>{formatter.format(props.price)}đ</span>
          </p>
        </div>
      </div>
      <div className="item-total-price">
        <div className="price">
          <span className="text"> Thành tiền </span>
          <span className="line-item-total">{formatter.format(quantity * props.price)}đ</span>
        </div>
        <div className="remove">
          <FaRegTrashAlt className='cursor-pointer' onClick={handleRemoveItem} />
        </div>
      </div>
    </div>
  )
}

export default CartContentItem