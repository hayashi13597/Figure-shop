import { Link } from "react-router-dom";

import { FaBars } from "react-icons/fa";
import logo from "../../assets/images/jewelry.png";
import Login from "./Login";
import Cart from "./Cart";
import SearchForm from "./SearchForm";

const HeaderMiddle = () => {
  return (
    <div className="header-middle">
      <div className="header-mobile__menu">
        <div className="mobile-meu__icon">
          <label htmlFor="header-menu">
            <FaBars />
          </label>
        </div>
        <input type="checkbox" hidden id="header-menu" className="nav-input" />
        <div className="mobile-menu" id="mobile-menu">
          <ul>
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <Link to="/about">Giới thiệu</Link>
            </li>
            <li>
              <Link to="#">Hướng dẫn</Link>
            </li>
            <li className="has-submenu">
              <Link to="/collections">Sản phẩm</Link>
            </li>
            <li>
              <Link to="#">Review</Link>
            </li>
            <li>
              <Link to="#">Ưu đãi</Link>
            </li>
            <li>
              <Link to="#">Kết nối</Link>
            </li>
            <li>
              <Link to="/contact">Liên hệ</Link>
            </li>
          </ul>
        </div>
      </div>
      <Link className="header-middle__logo" to="/">
        <img src={logo} />
      </Link>
      <SearchForm />
      <div className="header-middle__action">
        <Login />
        <Cart />
      </div>
    </div>
  );
};

export default HeaderMiddle;
