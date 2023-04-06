import React from 'react'
import DataTime from '../DataTime';
import OrderTable from './OrderTable';

const Order = () => {
  const title = "Quản lý hóa đơn";
  return (
    <>
      <div className="w-full px-14 py-4">
        <DataTime title={title} />
        <div className="bg-white mt-5 rounded">
          <div className="pt-5">
            <OrderTable />
          </div>
        </div>
      </div>
    </>
  )
}

export default Order