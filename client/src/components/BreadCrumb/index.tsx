import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = () => {
  return (
    <nav className="container flex py-2 bg-topBar" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3 md:w-4/5 mx-auto">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            Trang chủ
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <span className="pointer-events-none">/</span>
            <Link
              to="/collections"
              className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
            >
              Danh mục
            </Link>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <span className="pointer-events-none">/</span>
            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
              Tất cả sản phẩm
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default BreadCrumb;
