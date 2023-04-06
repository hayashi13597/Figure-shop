import React, { useState, useEffect } from "react";
import DataTime from "../DataTime";
import { Table } from "flowbite-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "./userSlice";
import * as Toastify from '../../../utils/toastify'
import { loadUser } from "../../../slice/authSlice";
import { useNavigate } from "react-router-dom";

const User = () => {
  const title = "Quản lý khách hàng";
  const [getUsers, setGetUsers] = useState([])
  const dispatch = useDispatch();
  const status = useSelector(state => state.user.status);
  const navigate = useNavigate();
  const user = useSelector((state) => state.authLogin.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [])

  if (!user || user?.isAdmin === false) {
    navigate('/')
  }

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:5000/api/auth/users");
      const data = res.data;
      setGetUsers(data);
    };
    fetchUser();
  }, [status]);

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId)).then(() => Toastify.successNotify("Xóa tài khoản thành công"))
  }

  return (
    <div className="w-full px-14 py-4">
      <DataTime title={title} />
      <div className="bg-white mt-5 rounded">
        <div className="pt-5">
          <Table>
            <Table.Head>
              <Table.HeadCell>ID</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Role</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {getUsers && getUsers.map((user) => (
                <Table.Row
                  key={user._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-wrap font-medium text-gray-900 dark:text-white">{user._id}</Table.Cell>
                  <Table.Cell className="whitespace-wrap font-medium text-gray-900 dark:text-white">
                    {user.email}
                  </Table.Cell>
                  <Table.Cell className="whitespace-wrap font-medium text-gray-900 dark:text-white">
                    {user.isAdmin === true ? 'Admin' : "User"}
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      onClick={() => handleDeleteUser(user._id.toString())}
                    >
                      Xóa
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default User;
