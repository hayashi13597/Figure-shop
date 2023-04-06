import React, { useEffect } from "react";

import { BiSearch } from "react-icons/bi";
import aiko1 from "../../assets/images/ako_1.jpg";
import HeaderNav from "./HeaderNav";
import HeaderMiddle from "./HeaderMiddle";

const Header = () => {
  useEffect(() => {
    function handleScroll() {
      const headerFixed = document.getElementById("header-fixed");
      const navFixed = document.getElementById("nav-fixed");
      const mybutton = document.getElementById("myBtn");
      if (
        document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300
      ) {
        mybutton?.classList.remove("disabled");
        headerFixed?.classList.add("header-fixed");
        navFixed?.classList.add("header-nav__fixed");
      } else {
        mybutton?.classList.add("disabled");
        headerFixed?.classList.remove("header-fixed");
        navFixed?.classList.remove("header-nav__fixed");
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-topbar">
        <strong>Freeship</strong> toàn quốc với đơn hàng từ
        <span className="header-topbar__btn">1000K</span>
      </div>
      <div className="container md:w-4/5" id="header-fixed">
        <HeaderMiddle />
        <div className="header-middle__input search-mobile pb-3">
          <input
            type="text"
            placeholder="Nhập sản phẩm bạn muốn tìm kiếm...?"
          />
          <button className="search__btn">
            <BiSearch className="text-2xl" />
          </button>
          <div className="header-search__wrap">
            <div className="search-result">
              <div className="search-result__text">
                <a href="#">Ako</a>
                <span>3,830,000</span>
              </div>
              <div className="search-result__img">
                <img src={aiko1} alt="" />
              </div>
            </div>
            <div className="search-result">
              <div className="search-result__text">
                <a href="#">Ako</a>
                <span>3,830,000</span>
              </div>
              <div className="search-result__img">
                <img src={aiko1} alt="" />
              </div>
            </div>
          </div>
        </div>
        <HeaderNav />
      </div>
    </header>
  );
};

export default Header;
