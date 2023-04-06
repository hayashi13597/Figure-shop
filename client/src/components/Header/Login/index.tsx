import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import bxUser from "../../../assets/images/bx-user.svg";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { loginAsync, logoutAsync } from './loginSlice';
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateLogin } from "../../../slice/authSlice";
import { Avatar, Dropdown } from "flowbite-react";
import * as Toastify from '../../../utils/toastify'

const LoginComponent: React.FC<{ showLogin: boolean, handleShowLogin: () => void }> = ({ showLogin, handleShowLogin }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.authLogin.user);
  const isAuthenticated = useSelector((state: any) => state.authLogin.isAuthenticated);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Email không được để trống").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      password: Yup.string().required('Mật khẩu không được để trống'),
    }),
    onSubmit(value) {
      dispatch(loginAsync(value)).then(() => { dispatch(loadUser()); handleShowLogin() });
    }
  });

  const handleLogout = () => {
    dispatch(logoutAsync()).then(() => {
      Toastify.successNotify("logout successfully")
      dispatch(loadUser());
    });
  }

  return (
    <>
      <div className={`header__account ${showLogin ? "js-action-show" : ""}`}>
        {isAuthenticated ? user &&
          <Dropdown label={<div className="box-account">
            <div className="account__icon">
              <Avatar
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded={true}
                bordered={true}
                color="gray"
              />
            </div>
            <div className="account__text">
              <div className="text-base">{user?.email}</div>
            </div>
          </div>}
            inline={true}>
            <Dropdown.Header>
              <span className="block text-sm">
                Welcome
              </span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </Dropdown.Header>
            {user.isAdmin && <Dropdown.Item>
              <Link to='/admin'>
                Dashboard
              </Link>
            </Dropdown.Item>}
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
          :
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
          </div>}
        <div className="box-login">
          <span className="box-triangle"></span>
          <div className="box-login__heading">
            <h2 className="box-login__heading--title">Đăng nhập tài khoản</h2>
            <p className="box-login__heading--legend">
              Nhập email và mật khẩu của bạn:
            </p>
          </div>
          <div className="box-login__inner">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-input">
                <input
                  type="email"
                  id="input-email"
                  className="form-field"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder=" "
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
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  placeholder=" "
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
                <Link to="/register" className="link">
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
    </>
  );
};

export default LoginComponent;
