import React, { useState, useEffect } from "react";
import DataTime from "./DataTime";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../slice/authSlice";
import { CiWallet, CiDatabase } from 'react-icons/ci';
import { FaCaretUp, FaUsers, FaExchangeAlt, FaShopify, FaCubes, FaBox } from 'react-icons/fa'
import axios from "axios";
import { Table } from "flowbite-react";
import formatter from "../../utils/formatter";
import Chart from "./chart";

interface IOrder {
  createdAt: string;
  paypalPayment: any;
  productId: string[];
  status: string;
  updatedAt: string;
  userId: {
    email: string;
    _id: string;
  };
  _id: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.authLogin.user);
  const [getOrders, setGetOrders] = useState < IOrder[] > ([])
  const [getProduct, setGetProduct] = useState([])
  const [categories, setCategories] = useState([])
  const [total, setTotal] = useState(0);
  const [userTotal, setUserTotal] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await axios.get < IOrder[] > ("http://localhost:5000/api/orders/");
      const data = res.data.sort((a, b) => {
        return +new Date(b.createdAt) - +new Date(a.createdAt);
      });
      const money = data.reduce((accumulator: number, item: IOrder) => {
        return accumulator + Number(item.paypalPayment.purchase_units[0].amount.value);
      }, 0);
      setTotal(money);
      setGetOrders(data);
    };
    fetchOrder();
    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:5000/api/products/");
      const data = res.data.products.sort((a: any, b: any) => {
        return +new Date(b.createdAt) - +new Date(a.createdAt);
      });;
      setGetProduct(data);
    };
    fetchProducts();
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:5000/api/auth/users");
      const data = res.data;
      setUserTotal(data);
    }
    fetchUser();
    const fetchCate = async () => {
      const res = await axios.get("http://localhost:5000/api/categories");
      const data = res.data.categories;
      setCategories(data);
    }
    fetchCate();
  }, []);

  useEffect(() => {
    dispatch(loadUser());
  }, [])

  if (user && user.isAdmin === false) {
    navigate('/')
  }
  const title: string = "Bảng điều khiển";
  return (
    <div className="w-full px-14 py-4">
      <DataTime title={title} />
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
          {/*Metric Card*/}
          <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-green-600"><CiWallet className="text-3xl text-white" /></div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h3 className="font-bold uppercase text-gray-600 text-2xl">Doanh thu</h3>
                <p className="font-bold text-3xl flex justify-center items-center">
                  {formatter.format(Math.round(total * 23452))}đ
                  <span className="text-green-500"><FaCaretUp /></span>
                </p>
              </div>
            </div>
          </div>
          {/*/Metric Card*/}
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
          {/*Metric Card*/}
          <div className="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-pink-600">
                  <FaUsers className="text-3xl text-white" />
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h2 className="font-bold uppercase text-gray-600 text-xl">Tổng Khách hàng</h2>
                <p className="font-bold text-3xl flex items-center justify-center gap-2">
                  {userTotal.length}
                  <span className="text-pink-500"><FaExchangeAlt /></span>
                </p>
              </div>
            </div>
          </div>
          {/*/Metric Card*/}
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
          {/*Metric Card*/}
          <div className="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-blue-600">
                  <CiDatabase className="text-3xl text-white" />
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h2 className="font-bold uppercase text-gray-600 text-xl">Tổng sản phẩm</h2>
                <p className="font-bold text-3xl">{getProduct.length}</p>
              </div>
            </div>
          </div>
          {/*/Metric Card*/}
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
          {/*Metric Card*/}
          <div className="bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-indigo-600">
                  <FaCubes className="text-3xl text-white" />
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h2 className="font-bold uppercase text-gray-600 text-xl">Tổng danh mục</h2>
                <p className="font-bold text-3xl">{categories.length}</p>
              </div>
            </div>
          </div>
          {/*/Metric Card*/}
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
          {/*Metric Card*/}
          <div className="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-yellow-600">
                  <FaShopify className="text-3xl text-white" />
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h2 className="font-bold uppercase text-gray-600 text-xl">Tổng đơn hàng</h2>
                <p className="font-bold text-3xl flex justify-center items-center gap-2">
                  {getOrders.length}
                  <span className="text-yellow-600">
                    <FaCaretUp />
                  </span></p>
              </div>
            </div>
          </div>
          {/*/Metric Card*/}
        </div>
      </div>
      <div className="bg-white rounded-lg p-5">
        <h3 className="text-xl font-bold">Đơn hàng gần đây</h3>
        <p className="w-full h-[2px] bg-yellow-300"></p>
        <div className="mt-3">
          <Table>
            <Table.Head>
              <Table.HeadCell>ID đơn hàng</Table.HeadCell>
              <Table.HeadCell>Khách hàng</Table.HeadCell>
              <Table.HeadCell>Sản phẩm</Table.HeadCell>
              <Table.HeadCell>Tổng tiền</Table.HeadCell>
              <Table.HeadCell>Tình trạng</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {getOrders && getOrders.slice(0, 4).map((order: any) => (
                <Table.Row
                  key={order._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-wrap font-medium text-gray-900 dark:text-white">{order._id}</Table.Cell>
                  <Table.Cell className="whitespace-wrap font-medium text-gray-900 dark:text-white">
                    {order.paypalPayment.purchase_units[0].shipping.name.full_name}
                  </Table.Cell>
                  <Table.Cell className="whitespace-wrap font-medium text-gray-900 dark:text-white w-2/5">{order.productId.map((item: any) => (<li key={item._id}>{item.name}</li>))}</Table.Cell>
                  <Table.Cell className="whitespace-wrap font-medium text-gray-900 dark:text-white">{formatter.format(Math.round(order.paypalPayment.purchase_units[0].amount.value * 23452))}đ</Table.Cell>
                  <Table.Cell className="whitespace-wrap font-medium text-gray-900 dark:text-white">
                    {order.paypalPayment.status === 'COMPLETED' && 'Hoàn thành'}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
      <div className="bg-white rounded-lg p-5 mt-5">
        <h3 className="text-xl font-bold">Sản phẩm được thêm gần đây</h3>
        <p className="w-full h-[2px] bg-yellow-300"></p>
        <div className="mt-3">
          <Table>
            <Table.Head>
              <Table.HeadCell>Tên sản phẩm</Table.HeadCell>
              <Table.HeadCell>Giá</Table.HeadCell>
              <Table.HeadCell>Danh mục</Table.HeadCell>
              <Table.HeadCell>Hình Ảnh</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {getProduct && getProduct.slice(0, 4).map((product: any) => (
                <Table.Row
                  key={product._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-wrap font-medium text-gray-900 dark:text-white">{product.name}</Table.Cell>
                  <Table.Cell className="whitespace-wrap font-medium text-gray-900 dark:text-white">{formatter.format(product.price)}đ</Table.Cell>
                  <Table.Cell className="whitespace-wrap font-medium text-gray-900 dark:text-white">
                    {product.categoryId.name}
                  </Table.Cell>
                  <Table.Cell>
                    <img className="w-20 h-20 object-contain" src={product.image} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
      <div className="bg-white mt-5 rounded-lg p-5">
        <h3 className="text-center font-bold">Thống kế doanh thu 4 tháng gần đây</h3>
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
