import { useState } from "react";
import { Link } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import bxUser from "../../../assets/images/bx-user.svg";

const LoginComponent: React.FC<{
  showLogin: boolean;
  handleShowLogin: () => void;
}> = ({ showLogin, handleShowLogin }) => {
  return (
    <div className={`header__account ${showLogin ? "js-action-show" : ""}`}>
      <div className="box-account" onClick={handleShowLogin}>
        <div className="account__icon">
          <img src={bxUser} />
        </div>
        <div className="account__text">
          <div className="text-up">Đăng nhập / Đăng ký</div>
          <div className="text-down">
            Tài khoản của tôi <BiChevronDown />
          </div>
        </div>
      </div>
      <div className="box-login">
        <span className="box-triangle"></span>
        <div className="box-login__heading">
          <h2 className="box-login__heading--title">Đăng nhập tài khoản</h2>
          <p className="box-login__heading--legend">
            Nhập email và mật khẩu của bạn:
          </p>
        </div>
        <div className="box-login__inner">
          <form action="">
            <div className="form-input">
              <input
                type="email"
                id="input-email"
                className="form-field"
                required
              />
              <label htmlFor="input-email" className="form-label">
                Email
              </label>
            </div>
            <div className="form-input">
              <input
                type="password"
                id="input-password"
                className="form-field"
                required
              />
              <label htmlFor="input-password" className="form-label">
                Mật khẩu
              </label>
              <div className="box__recaptcha">
                This site is protected by reCAPTCHA and the Google
                <Link to="#">Privacy Policy</Link> and
                <Link to="#">Terms of Service</Link> apply.
              </div>
            </div>
            <button type="submit" className="button form-submit">
              Đăng nhập
            </button>
          </form>
          <div className="box-login__action">
            <p>
              Khách hàng mới?
              <Link to="register.html" className="link">
                Tạo tài khoản
              </Link>
            </p>
            <p>
              Quên mật khẩu?
              <Link to="#" className="link">
                Khôi phục mật khẩu
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
