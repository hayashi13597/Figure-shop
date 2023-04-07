import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import bxUser from "../../../assets/images/bx-user.svg";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { loginAsync, logoutAsync } from './loginSlice';
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateLogin } from "../../../slice/authSlice";
import { Avatar, Dropdown, Table } from "flowbite-react";
import * as Toastify from '../../../utils/toastify'
import axios from "axios";
import formatter from "../../../utils/formatter";


const LoginComponent: React.FC<{ showLogin: boolean, handleShowLogin: () => void }> = ({ showLogin, handleShowLogin }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false)
  const [getOrders, setGetOrders] = useState([])
  const user = useSelector((state) => state.authLogin.user);
  const isAuthenticated = useSelector((state) => state.authLogin.isAuthenticated);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/${user._id}`);
        setGetOrders(res.data);
      } catch (error) {
        return;
      }
    }
    getOrder();
  }, [user])

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

  const handleShowModal = () => {
    setShowModal(!showModal);
  }

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
            <Dropdown.Item onClick={handleShowModal}>
              Đơn hàng
            </Dropdown.Item>
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
      {showModal &&
        <div className="fixed inset-0 flex items-center justify-center z-[999]" id="modal">
          <div className="relative w-full h-full max-w-7xl md:h-auto">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Đơn hàng
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal" onClick={handleShowModal}>
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-6 space-y-6">
                <Table>
                  <Table.Head>
                    <Table.HeadCell>Khách hàng</Table.HeadCell>
                    <Table.HeadCell>Sản phẩm</Table.HeadCell>
                    <Table.HeadCell>Tổng tiền</Table.HeadCell>
                    <Table.HeadCell>Trạng thái</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {getOrders && getOrders.map((order) => (
                      <Table.Row
                        key={order._id}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell className="whitespace-wrap font-medium text-gray-900 dark:text-white">
                          {order.paypalPayment.purchase_units[0].shipping.name.full_name}
                        </Table.Cell>
                        <Table.Cell className="whitespace-wrap font-medium text-gray-900 dark:text-white w-2/5">{order.productId.map((item) => (<li key={item._id}>{item.name}</li>))}</Table.Cell>
                        <Table.Cell className="whitespace-wrap font-medium text-gray-900 dark:text-white">{formatter.format(Math.round(order.paypalPayment.purchase_units[0].amount.value * 23452))}đ</Table.Cell>
                        <Table.Cell className="whitespace-wrap font-medium text-gray-900 dark:text-white">
                          {order.paypalPayment.status === 'COMPLETED' && 'Hoàn thành'}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
              {/* Modal footer */}
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={handleShowModal}>Đóng</button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default LoginComponent;
