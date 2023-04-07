import axios from 'axios';
import { Table } from 'flowbite-react';
import React, { useState, useEffect } from 'react'
import formatter from '../../../utils/formatter';
import * as Toastify from '../../../utils/toastify'
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, fetchOrders } from './orderSlice';

const OrderTable = () => {
  const [getOrders, setGetOrders] = useState([])
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.status);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:5000/api/orders/");
      const data = res.data;
      setGetOrders(data);
    };
    fetchProducts();
  }, [orders]);

  const handleDelete = (orderId) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      dispatch(deleteOrder(orderId)).then(() =>
        Toastify.successNotify("Xóa đơn hàng thành công")
      );
    }
  }

  return (
    <>
      <Table>
        <Table.Head>
          <Table.HeadCell>ID đơn hàng</Table.HeadCell>
          <Table.HeadCell>Khách hàng</Table.HeadCell>
          <Table.HeadCell>Đơn hàng</Table.HeadCell>
          <Table.HeadCell>Tổng tiền</Table.HeadCell>
          <Table.HeadCell>Tình trạng</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {getOrders && getOrders.map((order: any) => (
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
              <Table.Cell>
                <button
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  onClick={() => handleDelete(order._id.toString())}
                >
                  Xóa
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  )
}

export default OrderTable