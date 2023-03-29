import { Link } from "react-router-dom";
import { useState } from "react";

import logo from "../../assets/images/jewelry.png";
import Login from "./Login";
import Cart from "./Cart";
import SearchForm from "./SearchForm";

const HeaderMiddle = () => {
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleShowCart = () => {
    setShowCart(!showCart);
    setShowLogin(false);
  };

  const handleShowLogin = () => {
    setShowLogin(!showLogin);
    setShowCart(false);
  };

  return (
    <div className="header-middle">
      <Link className="header-middle__logo" to="/">
        <img src={logo} />
      </Link>
      <SearchForm />
      <div className="header-middle__action">
        <Login showLogin={showLogin} handleShowLogin={handleShowLogin} />
        <Cart showCart={showCart} handleShowCart={handleShowCart} />
      </div>
    </div>
  );
};

export default HeaderMiddle;
