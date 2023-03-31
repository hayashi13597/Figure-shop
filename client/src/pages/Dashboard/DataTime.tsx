import React, { useState, useEffect } from "react";

const DataTime: React.FC<{ title: string }> = ({ title }) => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // update every second

    return () => clearInterval(interval);
  }, []);

  const date = new Date();
  const formattedDate =
    date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }) +
    " - " +
    date.toLocaleTimeString("vi-VN");

  return (
    <div className="p-3 bg-white border-r-8 border-l-8 border-yellow-700 rounded flex justify-between">
      <p className="font-bold">{title}</p>
      <p className="font-bold">{formattedDate}</p>
    </div>
  );
};

export default DataTime;
