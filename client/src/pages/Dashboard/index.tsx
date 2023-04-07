import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import { BsFillDatabaseFill } from "react-icons/bs";
import { loadUser } from "../../slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../../components/Header/Login/loginSlice";
import * as Toastify from '../../utils/toastify';
import { FaReceipt } from "react-icons/fa";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.authLogin.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [])

  if (user?.isAdmin === false) {
    navigate('/')
  }

  const handleLogout = () => {
    dispatch(logoutAsync()).then(() => {
      Toastify.successNotify("logout successfully")
      dispatch(loadUser());
    });
  }

  return (
    <>
      <ToastContainer />
      <div
        id="view"
        className="h-full w-full flex flex-row"
        x-data="{ sidenav: true }"
      >
        <div
          id="sidebar"
          className="bg-[#D9D9D9] h-screen md:block shadow-xl px-3 w-1/5 overflow-x-hidden transition-transform duration-300 ease-in-out"
        >
          <div className="space-y-6 md:space-y-10 mt-10">
            <Link to='/' className="hidden md:block font-bold text-sm md:text-xl text-center">
              Figure Shop<span className="text-teal-600"></span>
            </Link>
            <div id="profile" className="space-y-3">
              <img
                src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png"
                alt="Avatar user"
                className="w-10 md:w-16 rounded-full mx-auto"
              />
              <div>
                <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">
                  Phúc Lâm
                </h2>
                <p className="text-xs text-gray-500 text-center font-bold">
                  Administrator
                </p>
              </div>
            </div>
            <div className="flex border-2 border-gray-200 rounded-md focus-within:ring-2 ring-[#242526]">
              <input
                type="text"
                className="w-full rounded-tl-md rounded-bl-md px-2 py-3 text-sm text-gray-600 focus:outline-none"
                placeholder="Search"
              />
              <button className="rounded-tr-md rounded-br-md px-2 py-3 hidden md:block">
                <svg
                  className="w-4 h-4 fill-current"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div id="menu" className="flex flex-col space-y-2">
              <Link to="" className="dash-link">
                <svg
                  className="w-6 h-6 fill-current inline-block"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span>Bảng điều khiển</span>
              </Link>
              <Link to="products" className="dash-link">
                <svg
                  className="w-6 h-6 fill-current inline-block"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
                <span>Quản lý sản phẩm</span>
              </Link>
              <Link to="categories" className="dash-link flex items-center">
                <BsFillDatabaseFill className="text-xl" />
                <span>Quản lý danh mục</span>
              </Link>
              <Link to="orders" className="dash-link flex items-center">
                <FaReceipt className="text-xl"/>
                <span>Quản lý hóa đơn</span>
              </Link>
              <Link to="users" className="dash-link">
                <svg
                  className="w-6 h-6 fill-current inline-block"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span>Quản lý khách hàng</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full bg-slate-200">
          <div className="w-full h-14 bg-[#D9D9D9] flex items-center justify-end">
            <Link to="/" onClick={handleLogout}>
              <FiLogOut className="text-5xl bg-slate-500 p-3 mr-10 hover:bg-[#242526] hover:text-white transition duration-150 ease-in-out" />
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
