import React, { useState, useEffect } from "react";
import DataTime from "./DataTime";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../slice/authSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.authLogin.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [])

  if (!user || user?.isAdmin === false) {
    navigate('/')
  }
  const title: string = "Bảng điều khiển";
  return (
    <div className="w-full px-14 py-4">
      <DataTime title={title} />
    </div>
  );
};

export default Dashboard;
