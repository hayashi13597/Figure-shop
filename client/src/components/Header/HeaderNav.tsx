import { Link } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import logo from "../../assets/images/jewelry.png";

const HeaderNav = () => {
  return (
    <nav className="header-nav" id="nav-fixed">
      <div className="header-nav__logo">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/">Trang chủ</Link>
        </li>
        <li>
          <Link to="/about">Giới thiệu</Link>
        </li>
        <li className="has-submenu" id="has-submenu">
          <Link to="/collections">
            Sản phẩm
            <BiChevronDown className="chervon-icon" />
          </Link>
          <ul className="submenu">
            <li>
              <Link to="#">Hàng có sẵn</Link>
            </li>
            <li>
              <Link to="#">Hàng order</Link>
            </li>
            <li>
              <Link to="#">Scale Figure</Link>
            </li>
            <li>
              <Link to="#">Nendoroid</Link>
            </li>
            <li>
              <Link to="#">Pop up Parade</Link>
            </li>
            <li>
              <Link to="#">Figma</Link>
            </li>
            <li>
              <Link to="#">R18</Link>
            </li>
            <li>
              <Link to="#">Các loại figure khác</Link>
            </li>
            <li>
              <Link to="#">Artbook</Link>
            </li>
            <li>
              <Link to="#">Fidget Spinner</Link>
            </li>
          </ul>
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
    </nav>
  );
};

export default HeaderNav;
