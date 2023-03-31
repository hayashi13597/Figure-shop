import React from "react";
import DataTime from "./DataTime";

const User = () => {
  const title: string = "Quản lý khách hàng";

  return (
    <div className="w-full px-14 py-4">
      <DataTime title={title} />
    </div>
  );
};

export default User;
