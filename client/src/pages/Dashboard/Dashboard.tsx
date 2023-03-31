import React, { useState, useEffect } from "react";
import DataTime from "./DataTime";

const Dashboard = () => {
  const title: string = "Bảng điều khiển";
  return (
    <div className="w-full px-14 py-4">
      <DataTime title={title} />
    </div>
  );
};

export default Dashboard;
